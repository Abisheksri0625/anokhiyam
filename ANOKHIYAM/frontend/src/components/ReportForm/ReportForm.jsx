import React, { useState } from 'react';
import styles from './ReportForm.module.css';

function ReportForm() {
  const reportQuestions = {
    Harassment: [
      "Where did the incident occur?",
      "Was it verbal, physical, or online?",
      "Was it repeated or a one-time event?",
      "Who was involved?",
      "Did anyone witness it?",
    ],
    Bullying: [
      "Describe the behavior or incident",
      "Was it targeted at you or someone else?",
      "Was it repeated over time?",
      "Did you report it before?",
      "Any supporting evidence?",
    ],
    "Teacher Misconduct": [
      "What behavior was inappropriate?",
      "When and where did it happen?",
      "Was it witnessed by others?",
      "Have you faced retaliation?",
      "Any proof or documentation?",
    ],
    "Mental Health": [
      "What symptoms or concerns are you reporting?",
      "Is the person at immediate risk?",
      "Have they asked for help?",
      "Is there a support system available?",
      "Any previous incidents?",
    ],
    "Drug Abuse": [
      "What substance is being used?",
      "How frequently is it used?",
      "Where is it happening?",
      "Is it affecting others?",
      "Any visual or written proof?",
    ],
  };

  const [type, setType] = useState('');
  const [answers, setAnswers] = useState({});
  const [evidence, setEvidence] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (q, val) => {
    setAnswers(prev => ({ ...prev, [q]: val }));
    setErrors(prev => ({ ...prev, [q]: false }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setEvidence(files);
    setErrors(prev => ({ ...prev, evidence: false }));
  };

  const handleSubmit = () => {
    const newErrors = {};

    if (!type) newErrors.type = true;

    if (type) {
      reportQuestions[type].forEach(q => {
        if (!answers[q] || answers[q].trim() === '') {
          newErrors[q] = true;
        }
      });
    }

    if (evidence.length === 0) {
      newErrors.evidence = true;
    }

    const containsVulgarity = Object.values(answers).some(a => /badword|offensive/i.test(a));

    if (containsVulgarity) {
      alert("Submission rejected due to inappropriate language.");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log("Report sent to admin:", { type, answers, evidence });
    }
  };

  if (submitted) {
    return (
      <div className={styles.confirmation}>
        <h2>✅ Your report has been submitted</h2>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2>Report an Issue</h2>

      <select
        className={errors.type ? styles.invalid : styles.select}
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="">Select Report Type</option>
        {Object.keys(reportQuestions).map(rt => (
          <option key={rt} value={rt}>{rt}</option>
        ))}
      </select>

      {type && reportQuestions[type].map(q => (
        <div key={q}>
          <label className={styles.label}>{q}</label>
          <textarea
            className={errors[q] ? styles.invalid : styles.textarea}
            onChange={e => handleAnswer(q, e.target.value)}
          />
        </div>
      ))}

      <div className={`${styles.upload} ${errors.evidence ? styles.invalidUpload : ''}`}>
        <label className={styles.label}>Upload Evidence</label>
        <input type="file" multiple onChange={handleFileUpload} />
        {evidence.length > 0 && (
          <ul>
            {evidence.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <button className={styles.button} onClick={handleSubmit}>Submit Report</button>
    </div>
  );
}

export default ReportForm;
