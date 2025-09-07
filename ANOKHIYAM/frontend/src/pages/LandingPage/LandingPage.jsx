import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Logo from '../../assets/logo.png'; 
import { 
  GraduationCap, 
  ChalkboardTeacher, 
  Books, 
  TrendUp, 
  Buildings, 
  UserPlus, 
  CurrencyDollar, 
  CalendarCheck, 
  ClipboardText,
  Lightning,
  Leaf,
  Target,
  Handshake,
  ChartLineUp,
  Rocket,
  MapPin,
  Phone,
  Envelope,
  LinkedinLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  FacebookLogo,
  GithubLogo
} from 'phosphor-react';

const LandingPage = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  const handleLoginClick = () => {
    navigate('/login');
  };
  
  const educationImages = [
    { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&h=250&fit=crop", alt: "Students Learning", label: "Students" },
    { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=200&h=250&fit=crop", alt: "Teaching", label: "Teachers" },
    { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=250&fit=crop", alt: "Admissions Process", label: "Admissions" },
    { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=250&fit=crop", alt: "Academic Management", label: "Academics" },
    { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=250&fit=crop", alt: "ERP Dashboard", label: "ERP System" },
    { src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=250&fit=crop", alt: "Library Management", label: "Library" },
    { src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200&h=250&fit=crop", alt: "Hostel Management", label: "Hostel" },
    { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=250&fit=crop", alt: "Report System", label: "Reports" },
  ];
  
  const featuresData = [
    { icon: CalendarCheck, title: "Attendance Management", description: "Biometric integration with automated reporting, parent notifications, and real-time attendance tracking across all classes and departments." },
    { icon: GraduationCap, title: "Academic Management", description: "Complete academic lifecycle management including curriculum planning, grade management, exam scheduling, and performance analytics." },
    { icon: UserPlus, title: "Admission System", description: "Streamlined admission process with online applications, document verification, and automated enrollment workflows." },
    { icon: CurrencyDollar, title: "Fee Management", description: "Secure online payment system with instant receipts, fee tracking, scholarship management, and financial reporting." },
    { icon: ChalkboardTeacher, title: "Teacher Portal", description: "Comprehensive teacher dashboard for lesson planning, grade entry, student communication, and workload management." },
    { icon: TrendUp, title: "Progress Analytics", description: "Real-time learning analytics with predictive insights, performance tracking, and customizable reporting dashboards." },
    { icon: Buildings, title: "Infrastructure Management", description: "Complete facility management including hostel allocation, mess management, and campus resource optimization." },
    { icon: Books, title: "Library Management", description: "Digital catalog system with seamless book lending, inventory tracking, fine management, and student reading analytics." },
    { icon: ClipboardText, title: "Report Generation", description: "Automated report generation for academics, attendance, financials, and institutional analytics with export capabilities." }
  ];
  
  return (
    <div className={styles.landingPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src={Logo} alt="Anokhiyam Logo" className={styles.logoImage} />
          </div>
          <nav className={styles.navigation}>
            <button onClick={() => scrollToSection('overview')} className={styles.navLink}>Overview</button>
            <button onClick={() => scrollToSection('features')} className={styles.navLink}>Features</button>
            <button onClick={() => scrollToSection('impact')} className={styles.navLink}>Impact</button>
            <button onClick={() => scrollToSection('about')} className={styles.navLink}>About</button>
          </nav>
          <div className={styles.authSection}>
            <button className={styles.checkResultsBtn}>Check Results</button>
            <button onClick={handleLoginClick} className={styles.loginBtn}>Log In</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="overview" className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Student Management System<br />
              <span className={styles.heroTitleBold}>Powered by Institutional Curation.</span>
            </h1>
            <p className={styles.impactSubtitlePremium}>
              "From Enrollment to Graduation, Empowering Students and Connecting Teachers, An ERP platform that delivers Seamless Academic and Administrative Excellence !"
            </p>

            {/* Video Carousel with Coverflow Effect */}
            <div className={styles.videoCarouselContainer}>
              <div className={styles.carouselWrapper}>
                <div className={styles.carouselTrack}>
                  {/* First set of images */}
                  {educationImages.map((image, index) => (
                    <div key={`first-${index}`} className={styles.carouselSlide}>
                      <img src={image.src} alt={image.alt} className={styles.carouselImage} />
                      <div className={styles.carouselOverlay}>
                        <span className={styles.carouselLabel}>{image.label}</span>
                      </div>
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {educationImages.map((image, index) => (
                    <div key={`second-${index}`} className={styles.carouselSlide}>
                      <img src={image.src} alt={image.alt} className={styles.carouselImage} />
                      <div className={styles.carouselOverlay}>
                        <span className={styles.carouselLabel}>{image.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.heroDescription}>
              <p className={styles.descriptionText}>
                ANOKHIYAM ERP is not just software, it's your institution's digital backbone — 
                uniting students, teachers, and administrators on one powerful platform. 
                From admissions to academics, attendance to analytics, everything flows seamlessly 
                with simplicity, speed, and security.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featuresHeader}>
            <h2 className={styles.featuresTitle}>Comprehensive ERP Features</h2>
            <p className={styles.featuresSubtitle}>
              Everything you need to manage your educational institution efficiently and effectively
            </p>
          </div>
        <div className={styles.featuresGrid}>
  {featuresData.map((feature, index) => {
    const IconComponent = feature.icon;
    return (
      <div key={index} className={styles.featureCard}>
        <div className={styles.featureIconWrapper}>
          <IconComponent 
            size={28}             // Slightly smaller for refined look
            weight="thin"         // Changed to "thin" for professional appearance
            color="#475569"       // Professional slate gray
            className={styles.featureIcon}
          />
        </div>
        <div className={styles.featureContent}>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureDescription}>{feature.description}</p>
        </div>
      </div>
    );
  })}
</div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className={styles.impact}>
        <div className={styles.impactContainer}>
          <div className={styles.impactHeader}>
            <h2 className={styles.impactTitle}>Transforming Education Through Technology</h2>
            <p className={styles.impactSubtitle}>
              Experience measurable results that drive educational excellence and institutional growth
            </p>
          </div>
          <div className={styles.impactCardsGrid}>
            <div className={styles.impactCard} data-color="blue">
              <div className={styles.impactIconWrapper}>
                <Lightning size={32} weight="bold" className={styles.impactIconPro} />
              </div>
              <h3 className={styles.impactCardTitle}>80% Faster Processes</h3>
              <p className={styles.impactCardText}>Streamlined workflows reduce manual tasks significantly</p>
            </div>
            <div className={styles.impactCard} data-color="green">
              <div className={styles.impactIconWrapper}>
                <Leaf size={32} weight="bold" className={styles.impactIconPro} />
              </div>
              <h3 className={styles.impactCardTitle}>Paperless & Eco-Friendly</h3>
              <p className={styles.impactCardText}>Digital transformation for sustainable education</p>
            </div>
            <div className={styles.impactCard} data-color="purple">
              <div className={styles.impactIconWrapper}>
                <Target size={32} weight="bold" className={styles.impactIconPro} />
              </div>
              <h3 className={styles.impactCardTitle}>Boosted Student Engagement</h3>
              <p className={styles.impactCardText}>Interactive tools that enhance learning experiences</p>
            </div>
            <div className={styles.impactCard} data-color="orange">
              <div className={styles.impactIconWrapper}>
                <Handshake size={32} weight="bold" className={styles.impactIconPro} />
              </div>
              <h3 className={styles.impactCardTitle}>Seamless Collaboration</h3>
              <p className={styles.impactCardText}>Connect students, teachers, and administrators effortlessly</p>
            </div>
            <div className={styles.impactCard} data-color="cyan">
              <div className={styles.impactIconWrapper}>
                <ChartLineUp size={32} weight="bold" className={styles.impactIconPro} />
              </div>
              <h3 className={styles.impactCardTitle}>Data-Driven Decisions</h3>
              <p className={styles.impactCardText}>Real-time analytics for informed institutional choices</p>
            </div>
            <div className={styles.impactCard} data-color="pink">
              <div className={styles.impactIconWrapper}>
                <Rocket size={32} weight="bold" className={styles.impactIconPro} />
              </div>
              <h3 className={styles.impactCardTitle}>Scalable & Future-Ready</h3>
              <p className={styles.impactCardText}>Grows with your institution's evolving needs</p>
            </div>
          </div>
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10,000+</div>
              <div className={styles.statText}>Students Empowered</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statText}>Institutions Connected</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statText}>Accuracy in Reports</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutMainContent}>
            <div className={styles.aboutTextSection}>
              <h2 className={styles.aboutTitle}>
                Revolutionizing Education<br />
                Through <span className={styles.aboutGradientText}>Intelligent Action</span>
              </h2>
              <p className={styles.aboutSubtitle}>
                Built for the Government of Rajasthan Directorate of Technical Education, 
                ANOKHIYAM transforms how institutions operate, engage, and excel. 
                Experience the future of educational management with our comprehensive ERP solution.
              </p>
              <div className={styles.aboutFeatures}>
                <div className={styles.aboutFeatureItem}>
                  <span className={styles.aboutFeatureIcon}>✓</span>
                  <span>Complete institutional management</span>
                </div>
                <div className={styles.aboutFeatureItem}>
                  <span className={styles.aboutFeatureIcon}>✓</span>
                  <span>Real-time analytics and reporting</span>
                </div>
                <div className={styles.aboutFeatureItem}>
                  <span className={styles.aboutFeatureIcon}>✓</span>
                  <span>Seamless integration across departments</span>
                </div>
              </div>
            </div>
            <div className={styles.aboutImagesSection}>
              <div className={styles.layeredImages}>
                <div className={styles.imageCard} data-layer="1">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop" alt="Students collaborating" />
                </div>
                <div className={styles.imageCard} data-layer="2">
                  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200&h=250&fit=crop" alt="Teacher with technology" />
                </div>
                <div className={styles.imageCard} data-layer="3">
                  <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=200&fit=crop" alt="Digital learning" />
                </div>
                <div className={styles.imageCard} data-layer="4">
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=200&fit=crop" alt="Modern classroom" />
                </div>
                <div className={styles.imageCard} data-layer="5">
                  <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop" alt="Analytics dashboard" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className={styles.comprehensiveFooter}>
            <div className={styles.footerGrid}>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Quick Links</h4>
                <ul className={styles.footerLinksList}>
                  <li><button onClick={() => scrollToSection('overview')} className={styles.footerLink}>Home</button></li>
                  <li><button onClick={() => scrollToSection('features')} className={styles.footerLink}>Features</button></li>
                  <li><button onClick={() => scrollToSection('impact')} className={styles.footerLink}>Impact</button></li>
                  <li><a href="#" className={styles.footerLink}>About Us</a></li>
                  <li><a href="#" className={styles.footerLink}>Careers</a></li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Resources</h4>
                <ul className={styles.footerLinksList}>
                  <li><a href="#" className={styles.footerLink}>Documentation</a></li>
                  <li><a href="#" className={styles.footerLink}>FAQs</a></li>
                  <li><a href="#" className={styles.footerLink}>Blog / Articles</a></li>
                  <li><a href="#" className={styles.footerLink}>Case Studies</a></li>
                  <li><a href="#" className={styles.footerLink}>Community Forum</a></li>
                </ul>
              </div>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Contact Info</h4>
                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <MapPin size={20} className={styles.contactIcon} />
                    <span>Directorate of Technical Education<br />Government of Rajasthan, India</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Phone size={20} className={styles.contactIcon} />
                    <span>+91-XXX-XXX-XXXX</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Envelope size={20} className={styles.contactIcon} />
                    <span>support@anokhiyam.com</span>
                  </div>
                  <div className={styles.socialMedia}>
                    <a href="#" className={styles.socialIcon}><FacebookLogo size={24} /></a>
                    <a href="#" className={styles.socialIcon}><InstagramLogo size={24} /></a>
                    <a href="#" className={styles.socialIcon}><TwitterLogo size={24} /></a>
                    <a href="#" className={styles.socialIcon}><GithubLogo size={24} /></a>
                  </div>
                </div>
              </div>
              <div className={styles.footerColumn}>
                <h4 className={styles.footerColumnTitle}>Legal</h4>
                <ul className={styles.footerLinksList}>
                  <li><a href="#" className={styles.footerLink}>Privacy Policy</a></li>
                  <li><a href="#" className={styles.footerLink}>Terms & Conditions</a></li>
                  <li><a href="#" className={styles.footerLink}>Cookie Policy</a></li>
                  <li><a href="#" className={styles.footerLink}>Licensing</a></li>
                </ul>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <div className={styles.footerBottomContent}>
                <div className={styles.footerBrandSection}>
                  <span className={styles.footerBrandLogo}>ANOKHIYAM</span>
                  <p className={styles.footerBrandText}>
                    Empowering educational institutions through intelligent management solutions.
                  </p>
                </div>
                <div className={styles.footerCopyright}>
                  <p>&copy; 2025 ANOKHIYAM. Transform. Excel. Inspire.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
