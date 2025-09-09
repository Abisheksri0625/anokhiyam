import React, { useState } from 'react';
import LibrarianSidebar from '../../../components/LibrarianSidebar/LibrarianSidebar';
import LibrarianHeader from '../../../components/LibrarianHeader/LibrarianHeader';
import styles from './Inventory.module.css';

const Inventory = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  // Extended sample data (real books + covers)
  const [books] = useState([
    {
      id: 1,
      name: "Artificial Intelligence: A Modern Approach",
      author: "Stuart Russell, Peter Norvig",
      publisher: "Pearson",
      year: 2021,
      category: "CS - AI",
      available: 12,
      status: "Scanned & Updated",
      description: "Comprehensive book on Artificial Intelligence fundamentals, techniques, and modern applications.",
      cover: "https://covers.openlibrary.org/b/isbn/0134610997-M.jpg"
    },
    {
      id: 2,
      name: "Clean Code",
      author: "Robert C. Martin",
      publisher: "Prentice Hall",
      year: 2019,
      category: "CS - Software Engineering",
      available: 8,
      status: "Pending Scan",
      description: "Guide to writing clean, maintainable, and efficient code. Focuses on software craftsmanship.",
      cover: "https://covers.openlibrary.org/b/isbn/0132350882-M.jpg"
    },
    {
      id: 3,
      name: "Deep Learning",
      author: "Ian Goodfellow",
      publisher: "MIT Press",
      year: 2016,
      category: "CS - AI",
      available: 5,
      status: "Scanned & Updated",
      description: "The definitive book on deep learning, covering neural networks, architectures, and applications.",
      cover: "https://covers.openlibrary.org/b/isbn/0262035618-M.jpg"
    },
    {
      id: 4,
      name: "Linear Algebra Done Right",
      author: "Sheldon Axler",
      publisher: "Springer",
      year: 2015,
      category: "Mathematics - Linear Algebra",
      available: 15,
      status: "Scanned & Updated",
      description: "Clear and conceptual approach to linear algebra, emphasizing vector spaces and linear maps.",
      cover: "https://covers.openlibrary.org/b/isbn/3319110799-M.jpg"
    },
    {
      id: 5,
      name: "Principles of Physics",
      author: "David Halliday, Robert Resnick, Jearl Walker",
      publisher: "Wiley",
      year: 2013,
      category: "Physics - General",
      available: 10,
      status: "Pending Scan",
      description: "Standard textbook covering mechanics, electromagnetism, thermodynamics, and modern physics.",
      cover: "https://covers.openlibrary.org/b/isbn/111823071X-M.jpg"
    },
    {
      id: 6,
      name: "Hamlet",
      author: "William Shakespeare",
      publisher: "Penguin Classics",
      year: 2005,
      category: "Literature - Drama",
      available: 20,
      status: "Scanned & Updated",
      description: "One of Shakespeare’s most famous tragedies, exploring revenge, madness, and political intrigue.",
      cover: "https://covers.openlibrary.org/b/isbn/0141015861-M.jpg"
    },
    {
      id: 7,
      name: "Principles of Management",
      author: "Peter Drucker",
      publisher: "Harper Business",
      year: 2007,
      category: "Management - Business",
      available: 18,
      status: "Scanned & Updated",
      description: "Foundational book on modern management practices, organizational behavior, and leadership.",
      cover: "https://covers.openlibrary.org/b/isbn/0061345016-M.jpg"
    },
    {
      id: 8,
      name: "The Selfish Gene",
      author: "Richard Dawkins",
      publisher: "Oxford University Press",
      year: 2016,
      category: "Biology - Evolution",
      available: 9,
      status: "Pending Scan",
      description: "Influential work on evolutionary biology explaining genes as the primary unit of natural selection.",
      cover: "https://covers.openlibrary.org/b/isbn/0199291152-M.jpg"
    },
    {
      id: 9,
      name: "Modern Operating Systems",
      author: "Andrew S. Tanenbaum",
      publisher: "Pearson",
      year: 2020,
      category: "CS - Operating Systems",
      available: 7,
      status: "Scanned & Updated",
      description: "Classic text on operating systems, covering architecture, processes, memory, and file systems.",
      cover: "https://covers.openlibrary.org/b/isbn/013359162X-M.jpg"
    },
    {
      id: 10,
      name: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      publisher: "MIT Press",
      year: 2022,
      category: "CS - Algorithms",
      available: 6,
      status: "Pending Scan",
      description: "Widely used textbook on algorithms, with comprehensive coverage of data structures and analysis.",
      cover: "https://covers.openlibrary.org/b/isbn/026204630X-M.jpg"
    },
    {
      id: 11,
      name: "Psychology: Themes and Variations",
      author: "Wayne Weiten",
      publisher: "Cengage Learning",
      year: 2017,
      category: "Psychology",
      available: 14,
      status: "Scanned & Updated",
      description: "Introductory psychology book with broad coverage of human behavior, cognition, and emotions.",
      cover: "https://covers.openlibrary.org/b/isbn/1337565691-M.jpg"
    },
    {
      id: 12,
      name: "Organic Chemistry",
      author: "Paula Yurkanis Bruice",
      publisher: "Pearson",
      year: 2018,
      category: "Chemistry",
      available: 11,
      status: "Scanned & Updated",
      description: "Detailed organic chemistry book covering reactions, mechanisms, and structural analysis.",
      cover: "https://covers.openlibrary.org/b/isbn/013404228X-M.jpg"
    }
  ]);

  // Filtered books
  const filteredBooks = books.filter(book =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.dashboardContainer}>
      <LibrarianSidebar 
        activeItem="inventory" 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className={`${styles.mainContent} ${isCollapsed ? styles.collapsed : ''}`}>
        <LibrarianHeader isCollapsed={isCollapsed} />
        <div className={styles.content}>
          <div className={styles.pageHeader}>
            <h1>Inventory Management</h1>
            <p>Manage and update library inventory using ISBN scans.</p>
          </div>

          {/* 🔍 Search Bar */}
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by title, author, publisher, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* 📚 Table */}
          <div className={styles.tableContainer}>
            <div className={styles.tableHeader}>
              <span>S.No</span>
              <span>Book Name</span>
              <span>Author</span>
              <span>Publisher</span>
              <span>Year</span>
              <span>Category</span>
              <span>Available</span>
              <span>Status</span>
            </div>

            {filteredBooks.map((book, index) => (
              <div 
                key={book.id} 
                className={styles.tableRow}
                onClick={() => setSelectedBook(book)}
              >
                <span>{index + 1}</span>
                <span>{book.name}</span>
                <span>{book.author}</span>
                <span>{book.publisher}</span>
                <span>{book.year}</span>
                <span>{book.category}</span>
                <span>{book.available}</span>
                <span className={book.status === "Scanned & Updated" ? styles.statusUpdated : styles.statusPending}>
                  {book.status}
                </span>
              </div>
            ))}
          </div>

          {/* 📖 Popup Modal */}
          {selectedBook && (
            <div className={styles.modalOverlay} onClick={() => setSelectedBook(null)}>
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={() => setSelectedBook(null)}>×</button>
                <h2>{selectedBook.name}</h2>

                {/* ✅ Cover image positioned in top-right corner */}
                {selectedBook.cover && (
                  <img 
                    src={selectedBook.cover} 
                    alt={selectedBook.name} 
                    className={styles.bookCoverFixed} 
                  />
                )}

                <p><strong>Author:</strong> {selectedBook.author}</p>
                <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
                <p><strong>Year:</strong> {selectedBook.year}</p>
                <p><strong>Category:</strong> {selectedBook.category}</p>
                <p><strong>Available:</strong> {selectedBook.available}</p>
                <p><strong>Status:</strong> {selectedBook.status}</p>
                <p className={styles.bookDesc}><strong>Description:</strong> {selectedBook.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
