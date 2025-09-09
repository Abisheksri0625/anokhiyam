import React, { useState } from 'react';
import styles from './LeaveRequest.module.css';

const LeaveRequest = () => {
  const [form, setForm] = useState({
    from: '',
    to: '',
    type: 'Leave',
    reason: '',
    proof: null
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState({
    staff: 'Pending',
    hod: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fromDate = new Date(form.from);
    const toDate = new Date(form.to);
    const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;

    if (diff > 2 && !form.proof) {
      alert("Proof required for leave more than 2 consecutive days.");
      return;
    }

    setSubmitted(true);
    setStatus({ staff: 'Pending', hod: null });

    setTimeout(() => {
      const staffDecision = Math.random() > 0.5 ? 'Accepted' : 'Forwarded to HoD';
      setStatus(prev => ({ ...prev, staff: staffDecision }));

      if (staffDecision === 'Forwarded to HoD') {
        setTimeout(() => {
          const hodDecision = Math.random() > 0.5 ? 'Accepted' : 'Rejected';
          setStatus(prev => ({ ...prev, hod: hodDecision }));
        }, 2000);
      }
    }, 2000);
  };

  const handleCancel = () => {
    setForm({
      from: '',
      to: '',
      type: 'Leave',
      reason: '',
      proof: null
    });
    setSubmitted(false);
    setStatus({ staff: 'Pending', hod: null });
  };

  const fromDate = new Date(form.from);
  const toDate = new Date(form.to);
  const diff = (toDate - fromDate) / (1000 * 60 * 60 * 24) + 1;
  const showProofUpload = form.from && form.to && diff > 2;

  if (submitted) {
    return (
      <div className={styles.container}>
        <h2>Leave Request Tracking</h2>

        <div className={styles.trackingPath}>
          <div className={styles.step}>
            <span className={styles.icon}>✅</span>
            <span className={styles.label}>Step 1: Request Submitted</span>
          </div>
          <div className={styles.connector}></div>

          <div className={styles.step}>
            <span className={styles.icon}>
              {status.staff === 'Pending' ? '🟡' : '✅'}
            </span>
            <span className={styles.label}>
              Step 2: Staff Review – {status.staff}
            </span>
          </div>

          {status.staff === 'Forwarded to HoD' && (
            <>
              <div className={styles.connector}></div>
              <div className={styles.step}>
                <span className={styles.icon}>
                  {status.hod ? '✅' : '🟡'}
                </span>
                <span className={styles.label}>
                  Step 3: HoD Decision – {status.hod || 'Pending'}
                </span>
              </div>
            </>
          )}
        </div>

        <button className={styles.cancel} onClick={handleCancel}>
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Submit Leave Form</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <label>Leave from:</label>
          <input type="date" name="from" value={form.from} onChange={handleChange} required />
        </div>
        <div className={styles.row}>
          <label>Leave to:</label>
          <input type="date" name="to" value={form.to} onChange={handleChange} required />
        </div>
        <div className={styles.row}>
          <label>Leave type:</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Leave">Leave</option>
            <option value="OD">OD</option>
          </select>
        </div>
        <div className={styles.row}>
          <label>Reason:</label>
          <textarea name="reason" value={form.reason} onChange={handleChange} required />
        </div>
        {showProofUpload && (
          <div className={styles.row}>
            <label>Upload Proof:</label>
            <input type="file" name="proof" onChange={handleChange} />
          </div>
        )}
        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancel} onClick={handleCancel}>Cancel Leave</button>
          <button type="submit" className={styles.submit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LeaveRequest;
