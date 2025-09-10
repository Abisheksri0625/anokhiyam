import React, { useState, useRef } from 'react';
import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import AdminSidebar from '../../../components/AdminSidebar/AdminSidebar';
import AdminHeader from '../../../components/AdminHeader/AdminHeader';
import styles from './PublishResults.module.css';
import { Upload, Download, CheckCircle, FileText, Warning } from 'phosphor-react';

const PublishResults = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [semester, setSemester] = useState('');
  const [loading, setLoading] = useState(false);
  const [publishedCount, setPublishedCount] = useState(0);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
      parseCSV(file);
      setErrors({});
    } else {
      setErrors({ file: 'Please upload a valid CSV file' });
    }
  };

  // Parse CSV file
  const parseCSV = (file) => {
    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          setErrors({ parse: 'CSV must have header row and data rows' });
          setLoading(false);
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim());
        
        // Process rows
        const processedData = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.trim());
          const row = {};
          
          headers.forEach((header, i) => {
            row[header.toLowerCase()] = values[i] || '';
          });

          // Extract subjects and calculate results
          const subjects = [];
          let totalObtained = 0;
          
          Object.keys(row).forEach(key => {
            const value = row[key];
            if (!['uid', 'studentname', 'dob'].includes(key) && !isNaN(value) && value !== '') {
              const marks = parseInt(value);
              subjects.push({
                name: key.charAt(0).toUpperCase() + key.slice(1),
                marks: marks
              });
              totalObtained += marks;
            }
          });

          const totalMarks = subjects.length * 100;
          const percentage = totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(2) : 0;
          const result = parseFloat(percentage) >= 35 ? 'PASS' : 'FAIL';

          return {
            uid: row.uid,
            studentName: row.studentname || row['student name'] || row.name,
            dob: row.dob || row['date of birth'],
            subjects: subjects,
            totalMarks: totalMarks,
            obtainedMarks: totalObtained,
            percentage: parseFloat(percentage),
            result: result
          };
        }).filter(row => row.uid && row.studentName);

        setPreviewData(processedData);
        setShowPreview(true);
        
      } catch (error) {
        setErrors({ parse: 'Error parsing CSV file. Please check format.' });
        console.error('Parse error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    reader.readAsText(file);
  };

  // Publish results
  const handlePublishResults = async () => {
    if (!classCode.trim() || !semester.trim()) {
      setErrors({ class: 'Please enter class & semester' });
      return;
    }

    if (previewData.length === 0) {
      setErrors({ data: 'No data to publish' });
      return;
    }

    setLoading(true);
    setErrors({});
    
    try {
      const batch = writeBatch(db);
      let successCount = 0;

      for (const student of previewData) {
        const docData = {
          classCode: classCode.trim(),
          semester: semester.trim(),
          uid: student.uid,
          studentName: student.studentName,
          dob: student.dob,
          subjects: student.subjects,
          totalMarks: student.totalMarks,
          obtainedMarks: student.obtainedMarks,
          percentage: student.percentage,
          result: student.result,
          publishDate: new Date(),
          createdAt: new Date()
        };

        const docRef = doc(collection(db, 'semester_results'));
        batch.set(docRef, docData);
        successCount++;
      }

      await batch.commit();
      setPublishedCount(successCount);
      setShowPreview(false);
      alert(`Successfully published ${successCount} semester results!`);
      
    } catch (error) {
      setErrors({ publish: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Reset
  const handleClearData = () => {
    setUploadedFile(null);
    setPreviewData([]);
    setShowPreview(false);
    setPublishedCount(0);
    setErrors({});
    setClassCode('');
    setSemester('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Download template
  const downloadTemplate = () => {
    const csvContent = "uid,studentName,dob,Subject1,Subject2,Subject3\n" +
                      "ST001,John Doe,2005-03-15,85,78,92\n" +
                      "ST002,Jane Smith,2005-07-20,90,88,95\n" +
                      "ST003,Bob Johnson,2005-01-10,45,50,60";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'semester_results_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.dashboardContainer}>
      <AdminSidebar activeItem="publish-results" />
      <div className={styles.mainContent}>
        <AdminHeader />
        <div className={styles.content}>
          
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Publish Semester Results</h1>
            <p className={styles.pageSubtitle}>Upload CSV and publish results to database</p>
          </div>

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className={styles.errorContainer}>
              <Warning size={20} />
              <div>
                {Object.values(errors).map((error, index) => (
                  <div key={index} className={styles.errorMessage}>
                    {error}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Class & Semester */}
          <div className={styles.institutionSection}>
            <div className={styles.institutionGroup}>
              <label className={styles.label}>Class Code *</label>
              <input
                type="text"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                placeholder="Enter class code (e.g., CSE-A)"
                className={`${styles.institutionInput} ${errors.class ? styles.inputError : ''}`}
                disabled={loading}
              />
            </div>
            <div className={styles.institutionGroup}>
              <label className={styles.label}>Semester *</label>
              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Enter semester (e.g., 5)"
                className={`${styles.institutionInput} ${errors.class ? styles.inputError : ''}`}
                disabled={loading}
              />
            </div>
          </div>

          {/* Upload Section */}
          <div className={styles.uploadSection}>
            <div className={styles.uploadHeader}>
              <h2>Upload Results CSV File</h2>
              <button 
                className={styles.templateBtn}
                onClick={downloadTemplate}
                disabled={loading}
              >
                <Download size={16} />
                Download Template
              </button>
            </div>
            
            <div className={styles.uploadArea}>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className={styles.fileInput}
                id="csvFile"
                disabled={loading}
              />
              <label htmlFor="csvFile" className={styles.uploadLabel}>
                <div className={styles.uploadContent}>
                  <Upload size={48} />
                  <div className={styles.uploadText}>
                    <strong>Click to upload CSV file or drag and drop</strong>
                    <span>CSV only • Max 10MB</span>
                    <span>Required: uid, studentName, dob, subject marks</span>
                  </div>
                </div>
              </label>
              
              {uploadedFile && (
                <div className={styles.fileInfo}>
                  <FileText size={20} />
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>{uploadedFile.name}</span>
                    <span className={styles.fileSize}>
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <button 
                    onClick={handleClearData} 
                    className={styles.clearBtn}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className={styles.previewSection}>
              <div className={styles.previewHeader}>
                <div className={styles.previewTitle}>
                  <h3>Preview Results</h3>
                  <div className={styles.previewStats}>
                    <span>{previewData.length} students</span>
                    <span>{previewData.filter(s => s.result === 'PASS').length} passed</span>
                    <span>{previewData.filter(s => s.result === 'FAIL').length} failed</span>
                  </div>
                </div>
                <div className={styles.previewActions}>
                  <button 
                    className={styles.cancelBtn}
                    onClick={() => setShowPreview(false)}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    className={styles.publishBtn}
                    onClick={handlePublishResults}
                    disabled={loading || !classCode.trim() || !semester.trim()}
                  >
                    {loading ? (
                      <div className={styles.loadingContent}>
                        <div className={styles.spinner}></div>
                        Publishing...
                      </div>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        Publish Results
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className={styles.tableContainer}>
                <table className={styles.previewTable}>
                  <thead>
                    <tr>
                      <th>UID</th>
                      <th>Name</th>
                      <th>DOB</th>
                      <th>Subjects</th>
                      <th>Total</th>
                      <th>%</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(0, 5).map((student, index) => (
                      <tr key={index} className={student.result === 'PASS' ? styles.passRow : styles.failRow}>
                        <td>{student.uid}</td>
                        <td>{student.studentName}</td>
                        <td>{student.dob}</td>
                        <td>
                          <div className={styles.subjectMarks}>
                            {student.subjects.map((subject, i) => (
                              <span key={i} className={styles.subject}>
                                {subject.name}: {subject.marks}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>{student.obtainedMarks}/{student.totalMarks}</td>
                        <td>{student.percentage}%</td>
                        <td>
                          <span className={`${styles.resultBadge} ${student.result === 'PASS' ? styles.pass : styles.fail}`}>
                            {student.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewData.length > 5 && (
                  <p className={styles.moreRecords}>
                    ... and {previewData.length - 5} more records
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Success */}
          {publishedCount > 0 && (
            <div className={styles.successSection}>
              <CheckCircle size={32} />
              <div className={styles.successContent}>
                <h3>Semester Results Published!</h3>
                <p>{publishedCount} student results saved</p>
                <p>Class: <strong>{classCode}</strong> | Semester: <strong>{semester}</strong></p>
                <button className={styles.newUploadBtn} onClick={handleClearData}>
                  Upload New Results
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PublishResults;
