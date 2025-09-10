import React, { useState, useEffect, useRef } from 'react';
import StudentSidebar from '../../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../../components/StudentHeader/StudentHeader';
import styles from './StudentGrades.module.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const subjectPool = {
  'Sem 1': ['Mathematics I', 'Physics', 'Chemistry', 'Programming Basics', 'Engineering Graphics'],
  'Sem 2': ['Mathematics II', 'Environmental Science', 'Python Programming', 'Digital Fundamentals', 'Communication Skills'],
  'Sem 3': ['Data Structures', 'Discrete Mathematics', 'Computer Architecture', 'Database Systems', 'Web Technologies'],
  'Sem 4': ['Operating Systems', 'Object-Oriented Programming', 'Software Engineering', 'Networks', 'Data Science'],
  'Sem 5': ['Machine Learning', 'Cloud Computing', 'Mobile App Dev', 'Cybersecurity', 'Compiler Design'],
  'Sem 6': ['AI & Robotics', 'Big Data Analytics', 'IoT Systems', 'Blockchain', 'UX Design'],
  'Sem 7': ['Natural Language Processing', 'AR/VR Development', 'DevOps', 'Quantum Computing', 'Ethical Hacking'],
  'Sem 8': ['Entrepreneurship', 'Project Management', 'Research Methodology', 'Capstone Project', 'Professional Ethics']
};

const generateMockData = () => {
  const data = {};
  for (let sem = 1; sem <= 8; sem++) {
    const semKey = `Sem ${sem}`;
    data[semKey] = {};
    for (let model = 1; model <= 3; model++) {
      data[semKey][`Model ${model}`] = subjectPool[semKey].map(subject => ({
        subject,
        marks: Math.floor(Math.random() * 51 + 50)
      }));
    }
  }
  return data;
};

const mockData = generateMockData();

const StudentGrades = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('studentSidebarCollapsed') === 'true');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [visibleMarks, setVisibleMarks] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('studentSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const handleSemesterSelect = (sem) => {
    setSelectedSemester(sem);
    setSelectedModel('');
    setVisibleMarks([]);
  };

  const handleModelSelect = (model) => {
    const semNum = parseInt(selectedSemester.split(' ')[1]);
    if (semNum >= 5 || (semNum === 4 && model !== 'Model 1')) {
      setVisibleMarks([]);
      return;
    }
    setSelectedModel(model);
    setVisibleMarks(mockData[selectedSemester][model]);
  };

  const handleExportPDF = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
    pdf.save('Marks_Report.pdf');
  };

  const handleExportImage = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const link = document.createElement('a');
    link.download = 'Marks_Report.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className={styles.pageContainer}>
      <StudentSidebar activeItem="grades" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader isCollapsed={isCollapsed} onMenuToggle={() => setIsCollapsed(!isCollapsed)} />
        <div className={styles.content}>
          <h1 style={{ color: '#059669', marginBottom: '1.5rem' }}>Marks</h1>

          {/* Semester Selection */}
          <div style={{ marginBottom: '1rem' }}>
            <h3>Semester</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {Object.keys(mockData).map((sem) => (
                <button
                  key={sem}
                  onClick={() => handleSemesterSelect(sem)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedSemester === sem ? '#059669' : '#e5e7eb',
                    color: selectedSemester === sem ? '#fff' : '#111',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          {selectedSemester && (
            <div style={{ marginBottom: '1rem' }}>
              <h3>Exam</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {Object.keys(mockData[selectedSemester]).map((model) => {
                  const semNum = parseInt(selectedSemester.split(' ')[1]);
                  if (semNum === 4 && model !== 'Model 1') return null;
                  if (semNum >= 5) return null;
                  return (
                    <button
                      key={model}
                      onClick={() => handleModelSelect(model)}
                      style={{
                        padding: '0.5rem 1rem',
                        background: selectedModel === model ? '#10b981' : '#e5e7eb',
                        color: selectedModel === model ? '#fff' : '#111',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {model}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Marks Table */}
          {visibleMarks.length > 0 && (
            <>
              <div ref={tableRef} style={{
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                marginTop: '1rem'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f0fdf4', textAlign: 'left' }}>
                      <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Subject</th>
                      <th style={{ padding: '0.75rem', borderBottom: '1px solid #ccc' }}>Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleMarks.map((s, index) => (
                      <tr key={index}>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{s.subject}</td>
                        <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{s.marks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Export Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={handleExportPDF} style={{
                  padding: '0.5rem 1rem',
                  background: '#059669',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  Export as PDF
                </button>
                <button onClick={handleExportImage} style={{
                  padding: '0.5rem 1rem',
                  background: '#059669',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}>
                  Export as Image
                </button>
              </div>
            </>
          )}

          {/* No Marks Message */}
          {selectedSemester && selectedModel && visibleMarks.length === 0 && (
            <p style={{ marginTop: '1rem', color: '#ef4444' }}>
              Marks not available for this selection.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentGrades;