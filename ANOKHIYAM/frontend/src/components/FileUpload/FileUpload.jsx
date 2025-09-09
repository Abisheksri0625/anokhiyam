import React from 'react';
import styles from './feedbackReport.module.css';

function FileUpload({ onUpload }) {
  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
  };

  return (
    <div className={styles.upload}>
      <label>Upload Evidence</label>
      <input type="file" multiple onChange={handleChange} />
    </div>
  );
}

export default FileUpload;
