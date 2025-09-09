import React, { useState } from 'react';
import styles from './YearCalendar.module.css';

const holidays2025 = {
  '2025-01-01': "New Year's Day",
  '2025-01-14': 'Pongal / Makar Sankranti',
  '2025-01-26': 'Republic Day',
  '2025-02-26': 'Maha Shivaratri',
  '2025-03-14': 'Holi',
  '2025-03-31': 'Idul Fitr',
  '2025-04-06': 'Ram Navami',
  '2025-04-18': 'Good Friday',
  '2025-05-12': 'Buddha Purnima',
  '2025-06-07': 'Bakrid / Eid al-Adha',
  '2025-07-06': 'Muharram',
  '2025-08-15': 'Independence Day',
  '2025-08-16': 'Janmashtami',
  '2025-09-05': 'Milad-un-Nabi',
  '2025-09-22': 'Navratri Begins',
  '2025-09-29': 'Durga Puja – Maha Saptami',
  '2025-09-30': 'Durga Puja – Maha Ashtami',
  '2025-10-02': 'Gandhi Jayanti / Vijaya Dashami',
  '2025-10-21': 'Diwali',
  '2025-11-05': 'Guru Nanak Jayanti',
  '2025-12-25': 'Christmas Day'
};


const YearCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(year, month, i));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={prevMonth}>&lt;</button>
        <h2>{monthNames[month]} {year}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className={styles.grid}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={styles.dayHeader}>{day}</div>
        ))}
        {calendarDays.map((date, i) => {
          if (!date) return <div key={i} className={styles.dayCell}></div>;

          const dateStr = date.toISOString().split('T')[0];
          const holiday = holidays2025[dateStr];

          const dayOfWeek = date.getDay();
          const weekNum = Math.floor((date.getDate() + firstDay - 1) / 7);
          const isSunday = dayOfWeek === 0;
          const isAltSaturday = dayOfWeek === 6 && weekNum % 2 === 0;
          const showLeave = isSunday || isAltSaturday;

          return (
            <div key={i} className={`${styles.dayCell} ${holiday ? styles.holiday : ''}`}>
              <span className={styles.date}>{date.getDate()}</span>
              {holiday && <span className={styles.label}>{holiday}</span>}
              {showLeave && <span className={styles.leave}>leave</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YearCalendar;
