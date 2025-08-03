import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import BubbleButton from './BubbleButton';
import { auth } from '../../services/firebase';
import '../styles/HomePage.css';
import AuthModal from './AuthModal';
import { onAuthStateChanged } from 'firebase/auth';
import recruitmentImage from '../assets/recruitment.svg';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [authFormType, setAuthFormType] = useState('login');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if(currentUser){
        navigate('/upload');
        setShowModal(false);
      }
      
      setAuthFormType('login');
    });

    return () => unsubscribe();
  }, [])

  const handleIfUserLoggedIn = () => {
    if(user != null){
      navigate('/upload')
    }
    else{
      setAuthFormType('login');
      setShowModal(true);
    }
  }
  

  return (
    <div>
      <Navbar />
      <div className="homepage-hero">
        <div className="homepage-content">
          <h1>Optimize Your Resume for Any Job</h1>
          <p>
            Get your resume past ATS and into the hands of recruiters. Our platform compares your resume against job descriptions and gives you a match score instantly.
          </p>
          <BubbleButton onClick={handleIfUserLoggedIn}>Submit Resume for FREE!</BubbleButton>
          {
            showModal && (
              <AuthModal
                defaultForm={authFormType}
                onClose={() => setShowModal(false)}
              />
            )
          }
        </div>
        <div className="homepage-image">
          <img src={recruitmentImage} alt="Job Matching Illustration" />
        </div>
      </div>

      <div className="homepage-info" style={{ padding: '2rem', textAlign: 'center' }}>
        {/* Why Use Our Resume Scanner */}
        <h2 style={{ marginBottom: '1.5rem' }}>Why Use Our DreamJob ?</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {[
            'Increase chances of passing Applicant Tracking Systems (ATS)',
            'Instant feedback and improvement suggestions',
            'Trusted by job seekers globally',
            'One step towards your dream job',
          ].map((point, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#e6f0ff',
                padding: '1rem 1.5rem',
                borderRadius: '10px',
                minWidth: '220px',
                textAlign: 'center',
                color: '#003366',
                fontWeight: 500,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              ✅ {point}
            </div>
          ))}
        </div>

        {/* Features */}
        <h2 style={{ marginBottom: '1.5rem' }}>Features</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          {[
            'Resume to Job Matching',
            'Real-time Optimization',
            'Data-driven Scoring',
            'Privacy Guaranteed',
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f0f0f0',
                padding: '1rem 1.5rem',
                borderRadius: '10px',
                minWidth: '220px',
                textAlign: 'center',
                color: '#333',
                fontWeight: 500,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
              }}
            >
              ✅ {feature}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;
