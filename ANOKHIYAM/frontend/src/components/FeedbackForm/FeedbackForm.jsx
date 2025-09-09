import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';

export default function FeedbackForm() {
  const feedbackQuestions = [
    "Explains concepts clearly",
    "Uses relevant examples and illustrations",
    "Encourages student participation",
    "Responds to doubts effectively",
    "Maintains discipline and fairness",
    "Completes syllabus on time",
    "Provides useful assignments and materials",
    "Is approachable and respectful",
    "Communicates learning objectives clearly",
    "Adapts teaching methods to student needs",
    "Uses technology effectively in teaching",
    "Creates a safe and inclusive classroom environment",
    "Gives timely and constructive feedback",
    "Supports students during assessments and exams",
    "Respects student privacy and confidentiality",
    "Promotes critical thinking and problem-solving",
    "Is punctual and well-prepared for classes",
    "Encourages ethical behavior and academic integrity"
  ];

  const ratings = ["Excellent", "Very Good", "Good", "OK", "Bad", "Very Bad"];

  const [staff, setStaff] = useState('');
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSelect = (question, rating) => {
    setResponses(prev => ({ ...prev, [question]: rating }));
    setErrors(prev => ({ ...prev, [question]: false }));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!staff) newErrors.staff = true;

    feedbackQuestions.forEach(q => {
      if (!responses[q]) newErrors[q] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log({ staff, responses });
      // Backend logic goes here
    }
  };

  if (submitted) {
    return (
      <div className={styles.confirmation}>
        <h2>Your response has been recorded</h2>
        <p>Thank you for submitting feedback.</p>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2>Staff Feedback</h2>

      <select
        className={errors.staff ? styles.invalid : styles.select}
        value={staff}
        onChange={e => setStaff(e.target.value)}
      >
        <option value="">Select Staff</option>
        <option value="Ms. Priya">Ms. Priya</option>
        <option value="Mr. Arun">Mr. Arun</option>
      </select>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Question</th>
            {ratings.map(r => <th key={r}>{r}</th>)}
          </tr>
        </thead>
        <tbody>
          {feedbackQuestions.map(q => (
            <tr key={q} className={errors[q] ? styles.invalidRow : ''}>
              <td>{q}</td>
              {ratings.map(r => (
                <td key={r}>
                  <input
                    type="radio"
                    name={q}
                    checked={responses[q] === r}
                    onChange={() => handleSelect(q, r)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.button} onClick={handleSubmit}>
        Submit Feedback
      </button>
    </div>
  );
}
