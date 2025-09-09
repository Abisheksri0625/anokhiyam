import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../components/StudentSidebar/StudentSidebar';
import StudentHeader from '../../components/StudentHeader/StudentHeader';
import styles from './StudentDashboard.module.css';

const StudentDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('studentSidebarCollapsed') === 'true');
  const [selectedCircular, setSelectedCircular] = useState(null);

  useEffect(() => {
    localStorage.setItem('studentSidebarCollapsed', isCollapsed);
  }, [isCollapsed]);

  const scrollLeft = (id) => {
    const container = document.getElementById(id);
    container.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = (id) => {
    const container = document.getElementById(id);
    container.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className={styles.pageContainer}>
      <StudentSidebar activeItem="dashboard" isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <StudentHeader isCollapsed={isCollapsed} onMenuToggle={() => setIsCollapsed(!isCollapsed)} />
        <div className={styles.content}>

          {/* Upcoming Events + Circulars */}
          <section className={styles.section}>
            <div className={styles.sideBySideContainer}>
              <div className={styles.sideBox}>
                <h2>Upcoming Events</h2>
                <ul className={styles.list}>
                  <li>Orientation Program – Sept 15</li>
                  <li>Hackathon – Sept 20</li>
                  <li>Guest Lecture – Sept 25</li>
                </ul>
              </div>

              {/* Circulars Section */}
              <div className={styles.sideBox}>
                <h2>Circulars</h2>
                <div className={styles.circularList}>
                  {[
                    { date: "July 30 2025", title: "Circular - Chem 30 07 2025", img: "https://stjosephs.ac.in/Popup/090920251.jpg" },
                    { date: "July 30 2025", title: "Circular - CSE 30 07 2025", img: "https://stjosephs.ac.in/Popup/090920252.jpg" },
                    { date: "July 30 2025", title: "Circular - IT 30 07 2025", img: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_700,h_700/https://stjosephstechnology.ac.in/home/wp-content/uploads/2025/03/hackathon-uyir-700x700.jpg" },
                    { date: "July 28 2025", title: "Staff Circular 28 07 2025", img: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_700,h_700/https://stjosephstechnology.ac.in/home/wp-content/uploads/2025/03/pep-participation-700x700.jpg" },
                  ].map((circular, idx) => (
                    <div key={idx} className={styles.circularItem} onClick={() => setSelectedCircular(circular.img)}>
                      <div className={styles.dateBox}>
                        <span className={styles.month}>{circular.date.split(" ")[0]}</span>
                        <span className={styles.day}>{circular.date.split(" ")[1]}</span>
                        <span className={styles.year}>{circular.date.split(" ")[2]}</span>
                      </div>
                      <div className={styles.circularTitle}>{circular.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Competitions / Internships Section */}
          <section className={styles.section}>
            <h2>Competitions / Internships</h2>
            <div className={styles.scrollWrapper}>
              <button className={styles.scrollBtn} onClick={() => scrollLeft('competitionsScroll')}>&lt;</button>
              <div className={styles.scrollContainer} id="competitionsScroll">
                {[
                  "https://tse1.mm.bing.net/th/id/OIP.DDjFk-aWxi4GcS2OgBC1RAHaLH",
                  "https://casml.cc/wp-content/uploads/2024/12/GenAI_hackathon_flyer.png",
                  "https://kechackathon.kongu.edu/assets//poster.png",
                  "https://bvrit.ac.in/wp-content/uploads/2025/02/Poster-AIDS.jpg",
                  "https://iar.ac.in/wp-content/uploads/2023/08/Biotech-Hackathon-Flyer-final.png"
                ].map((img, idx) => (
                  <div key={idx} className={styles.card}>
                    <img src={img} alt={`Competition ${idx + 1}`} className={styles.cardImage} />
                  </div>
                ))}
              </div>
              <button className={styles.scrollBtn} onClick={() => scrollRight('competitionsScroll')}>&gt;</button>
            </div>
          </section>

          {/* Achievements Section */}
          <section className={styles.section}>
            <h2>Achievements</h2>
            <div className={styles.scrollWrapper}>
              <button className={styles.scrollBtn} onClick={() => scrollLeft('achievementsScroll')}>&lt;</button>
              <div className={styles.scrollContainer} id="achievementsScroll">
                {[
                  "https://stjosephs.ac.in/Popup/090920251.jpg",
                  "https://stjosephs.ac.in/Popup/090920252.jpg",
                  "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_700,h_700/https://stjosephstechnology.ac.in/home/wp-content/uploads/2025/03/hackathon-uyir-700x700.jpg",
                  "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_700,h_700/https://stjosephstechnology.ac.in/home/wp-content/uploads/2025/03/pep-participation-700x700.jpg",
                  "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_700,h_700/https://stjosephstechnology.ac.in/home/wp-content/uploads/2025/03/ui-path-hack-a-bot-winners-700x700.jpg"
                ].map((img, idx) => (
                  <div key={idx} className={styles.card}>
                    <img src={img} alt={`Achievement ${idx + 1}`} className={styles.cardImage} />
                  </div>
                ))}
              </div>
              <button className={styles.scrollBtn} onClick={() => scrollRight('achievementsScroll')}>&gt;</button>
            </div>
          </section>

        </div>
      </div>

      {/* Circular Modal */}
      {selectedCircular && (
        <div className={styles.modalOverlay} onClick={() => setSelectedCircular(null)}>
          <div className={styles.modalContent}>
            <img src={selectedCircular} alt="Circular" />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
