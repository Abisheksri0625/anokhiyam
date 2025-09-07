import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';  // Add this import
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { useFeatures } from '../../hooks/useFeatures';
import { 
  saveEntranceResults, 
  getSubjectsConfig, 
  saveSubjectsConfig 
} from '../../services/firestoreService';
import styles from './EntranceResults.module.css';

const EntranceResults = () => {
  const { currentUser } = useAuth();
  const { config } = useFeatures();
  const [activeTab, setActiveTab] = useState('upload');
  const [studentCategory, setStudentCategory] = useState('12th');
  const [subjects, setSubjects] = useState({
    '12th': ['Mathematics', 'Science', 'Chemistry'],
    'pg': ['Advanced Physics', 'Advanced Chemistry', 'Advanced Mathematics']
  });
  const [results, setResults] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [csvPreview, setCsvPreview] = useState(null);
  const [csvError, setCsvError] = useState('');

  // Institution info
  const institutionCode = config?.institutionCode || 'ANOKHIYAM2024';
  const institutionName = config?.name || 'ANOKHIYAM Demo University';

  // Handle CSV file upload and parsing[469][475]
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setCsvError('');
    
    if (!file) {
      return;
    }

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setCsvError('Please upload a valid CSV file');
      return;
    }

    setUploadFile(file);

    // Parse CSV using PapaParse
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function(parseResult) {
        try {
          console.log('CSV Parse Result:', parseResult);
          
          if (parseResult.errors.length > 0) {
            setCsvError(`CSV parsing errors: ${parseResult.errors.map(e => e.message).join(', ')}`);
            return;
          }

          const csvData = parseResult.data;
          const csvHeaders = parseResult.meta.fields || [];
          
          // Validate required headers
          const requiredHeaders = ['StudentID', 'RollNumber', 'StudentName', 'DateOfBirth', ...subjects[studentCategory]];
          const missingHeaders = requiredHeaders.filter(header => !csvHeaders.includes(header));
          
          if (missingHeaders.length > 0) {
            setCsvError(`Missing required columns: ${missingHeaders.join(', ')}`);
            return;
          }

          // Process and validate data
          const processedResults = csvData.map((row, index) => {
            // Calculate total marks and percentage
            const totalMarks = subjects[studentCategory].reduce((sum, subject) => {
              const mark = parseInt(row[subject]) || 0;
              return sum + mark;
            }, 0);
            
            const percentage = ((totalMarks / (subjects[studentCategory].length * 100)) * 100).toFixed(2);
            const result = percentage >= 50 ? 'Pass' : 'Fail';

            return {
              studentId: row.StudentID || '',
              rollNumber: row.RollNumber || '',
              studentName: row.StudentName || '',
              dateOfBirth: row.DateOfBirth || '',
              ...subjects[studentCategory].reduce((acc, subject) => {
                acc[subject] = parseInt(row[subject]) || 0;
                return acc;
              }, {}),
              totalMarks: totalMarks,
              percentage: parseFloat(percentage),
              result: result
            };
          });

          setResults(processedResults);
          setCsvPreview({
            fileName: file.name,
            recordCount: processedResults.length,
            headers: csvHeaders
          });
          
          alert(`Successfully parsed ${processedResults.length} student records from CSV`);
          
        } catch (error) {
          console.error('Error processing CSV:', error);
          setCsvError('Error processing CSV file. Please check the format.');
        }
      },
      error: function(error) {
        console.error('Papa Parse error:', error);
        setCsvError('Failed to parse CSV file');
      }
    });
  };

  // Add manual result row
  const addResultRow = () => {
    const newRow = {
      studentId: '',
      rollNumber: '',
      studentName: '',
      dateOfBirth: '',
      ...subjects[studentCategory].reduce((acc, subject) => ({ ...acc, [subject]: '' }), {}),
      totalMarks: 0,
      percentage: 0,
      result: 'Fail'
    };
    setResults([...results, newRow]);
  };

  // Remove result row
  const removeResultRow = (index) => {
    setResults(results.filter((_, i) => i !== index));
  };

  // Handle manual result input change
  const handleResultChange = (index, field, value) => {
    const updatedResults = [...results];
    updatedResults[index][field] = value;
    
    // Calculate total marks and percentage when subject marks change
    if (subjects[studentCategory].includes(field)) {
      const totalMarks = subjects[studentCategory].reduce((sum, subject) => {
        return sum + (parseInt(updatedResults[index][subject]) || 0);
      }, 0);
      const percentage = ((totalMarks / (subjects[studentCategory].length * 100)) * 100).toFixed(2);
      
      updatedResults[index].totalMarks = totalMarks;
      updatedResults[index].percentage = percentage;
      updatedResults[index].result = percentage >= 50 ? 'Pass' : 'Fail';
    }
    
    setResults(updatedResults);
  };

  // Clear uploaded data
  const clearResults = () => {
    setResults([]);
    setUploadFile(null);
    setCsvPreview(null);
    setCsvError('');
  };

  // Publish results to Firebase
  const publishResults = async () => {
    if (results.length === 0) {
      alert('No results to publish');
      return;
    }

    // Validate all required fields
    const invalidRows = results.filter(row => 
      !row.studentId || !row.rollNumber || !row.studentName || !row.dateOfBirth
    );

    if (invalidRows.length > 0) {
      alert(`Please fill all required fields (Student ID, Roll Number, Name, Date of Birth) for all students`);
      return;
    }

    setUploading(true);
    try {
      const publishData = {
        institutionCode,
        institutionName,
        studentCategory,
        subjects: subjects[studentCategory],
        results,
        publishedBy: currentUser?.email,
        publishedAt: new Date().toISOString(),
        totalStudents: results.length,
        passedStudents: results.filter(r => r.result === 'Pass').length,
        failedStudents: results.filter(r => r.result === 'Fail').length
      };

      console.log('Publishing results to Firebase:', publishData);
      
      // Save to Firebase
      const resultId = await saveEntranceResults(publishData);
      console.log('Results published with ID:', resultId);
      
      alert(`Successfully published ${results.length} results for ${studentCategory} students!\n\nPassed: ${publishData.passedStudents}\nFailed: ${publishData.failedStudents}\n\nStudents can now check their results using their credentials.`);
      
      // Clear form after successful publish
      clearResults();
      
    } catch (error) {
      console.error('Error publishing results:', error);
      alert('Error publishing results. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Initialize manual entry with one empty row
  useEffect(() => {
    if (activeTab === 'manual' && results.length === 0) {
      addResultRow();
    }
  }, [activeTab]);

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="entrance-results" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Entrance Results Management</h1>
            <p className={styles.pageSubtitle}>Upload and publish entrance exam results for students.</p>
          </div>

          {/* Institution Display */}
          <div className={styles.institutionDisplay}>
            <div className={styles.institutionInfo}>
              <h3>{institutionName}</h3>
              <p>Institution Code: <strong>{institutionCode}</strong></p>
              <small>You can only publish results for your institution</small>
            </div>
          </div>

          {/* Student Category Selection */}
          <div className={styles.selectionSection}>
            <div className={styles.selectionGroup}>
              <label className={styles.selectionLabel}>Student Category:</label>
              <div className={styles.categoryTabs}>
                <button 
                  className={`${styles.categoryTab} ${studentCategory === '12th' ? styles.active : ''}`}
                  onClick={() => setStudentCategory('12th')}
                >
                  12th Students
                </button>
                <button 
                  className={`${styles.categoryTab} ${studentCategory === 'pg' ? styles.active : ''}`}
                  onClick={() => setStudentCategory('pg')}
                >
                  PG Students
                </button>
              </div>
            </div>
          </div>

          {/* Upload Methods */}
          <div className={styles.contentSection}>
            <h3>Upload Results</h3>
            <div className={styles.uploadTabs}>
              <button 
                className={`${styles.uploadTab} ${activeTab === 'upload' ? styles.active : ''}`}
                onClick={() => setActiveTab('upload')}
              >
                CSV Upload
              </button>
              <button 
                className={`${styles.uploadTab} ${activeTab === 'manual' ? styles.active : ''}`}
                onClick={() => setActiveTab('manual')}
              >
                Manual Entry
              </button>
            </div>

            {activeTab === 'upload' && (
              <div className={styles.uploadSection}>
                <div className={styles.uploadArea}>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className={styles.fileInput}
                    id="csvUpload"
                  />
                  <label htmlFor="csvUpload" className={styles.uploadLabel}>
                    <div className={styles.uploadIcon}>Upload CSV</div>
                    <div>
                      <h4>Upload CSV File</h4>
                      <p>Click to select your CSV file with student results</p>
                      <small>Required columns: StudentID, RollNumber, StudentName, DateOfBirth, {subjects[studentCategory].join(', ')}</small>
                    </div>
                  </label>
                  
                  {csvError && (
                    <div className={styles.errorMessage}>
                      <strong>Error:</strong> {csvError}
                    </div>
                  )}
                  
                  {csvPreview && (
                    <div className={styles.csvPreview}>
                      <h4>CSV Preview</h4>
                      <p><strong>File:</strong> {csvPreview.fileName}</p>
                      <p><strong>Records:</strong> {csvPreview.recordCount} students</p>
                      <p><strong>Columns:</strong> {csvPreview.headers.join(', ')}</p>
                      <button onClick={clearResults} className={styles.clearBtn}>
                        Clear and Upload New File
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results Table */}
          {results.length > 0 && (
            <div className={styles.contentSection}>
              <div className={styles.sectionHeader}>
                <h3>Results {activeTab === 'upload' ? 'Preview' : 'Entry'} ({results.length} students)</h3>
                {activeTab === 'manual' && (
                  <button onClick={addResultRow} className={styles.addBtn}>+ Add Student</button>
                )}
              </div>
              
              <div className={styles.tableContainer}>
                <table className={styles.resultsTable}>
                  <thead>
                    <tr>
                      <th>Student ID*</th>
                      <th>Roll Number*</th>
                      <th>Name*</th>
                      <th>Date of Birth*</th>
                      {subjects[studentCategory].map(subject => (
                        <th key={subject}>{subject}</th>
                      ))}
                      <th>Total</th>
                      <th>%</th>
                      <th>Result</th>
                      {activeTab === 'manual' && <th>Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            value={row.studentId || ''}
                            onChange={(e) => handleResultChange(index, 'studentId', e.target.value)}
                            className={styles.tableInput}
                            placeholder="STU001"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.rollNumber || ''}
                            onChange={(e) => handleResultChange(index, 'rollNumber', e.target.value)}
                            className={styles.tableInput}
                            placeholder="2024001"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={row.studentName || ''}
                            onChange={(e) => handleResultChange(index, 'studentName', e.target.value)}
                            className={styles.tableInput}
                            placeholder="Student Name"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            value={row.dateOfBirth || ''}
                            onChange={(e) => handleResultChange(index, 'dateOfBirth', e.target.value)}
                            className={styles.tableInput}
                            required
                          />
                        </td>
                        {subjects[studentCategory].map(subject => (
                          <td key={subject}>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={row[subject] || ''}
                              onChange={(e) => handleResultChange(index, subject, e.target.value)}
                              className={styles.tableInput}
                              placeholder="0-100"
                            />
                          </td>
                        ))}
                        <td className={styles.totalCell}>{row.totalMarks}</td>
                        <td className={styles.percentageCell}>{row.percentage}%</td>
                        <td className={`${styles.resultCell} ${row.result === 'Pass' ? styles.pass : styles.fail}`}>
                          {row.result}
                        </td>
                        {activeTab === 'manual' && (
                          <td>
                            <button
                              onClick={() => removeResultRow(index)}
                              className={styles.removeBtn}
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Publish Section */}
          {results.length > 0 && (
            <div className={styles.publishSection}>
              <div className={styles.publishStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{results.length}</span>
                  <span className={styles.statLabel}>Total Students</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{results.filter(r => r.result === 'Pass').length}</span>
                  <span className={styles.statLabel}>Passed</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{results.filter(r => r.result === 'Fail').length}</span>
                  <span className={styles.statLabel}>Failed</span>
                </div>
              </div>
              
              <button
                onClick={publishResults}
                disabled={uploading}
                className={styles.publishBtn}
              >
                {uploading ? 'Publishing to Firebase...' : 'Publish Results to Database'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntranceResults;
