import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UploadForm.css';
import BubbleButton from './BubbleButton';
import Navbar from './Navbar';

const ResponsePage = ({ response }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!response) {
      navigate('/upload');
    }
  }, [response]);

  if (!response) return null;

  return (
    <>
        <Navbar />
        <div className="upload-container">
        <div className="upload-form">
            <h2>🎯 Match Result</h2>
            <div className="response-section">
            <p><strong>Match Score:</strong> {response.match_score || 'N/A'}%</p>
            <br />
            <p><strong>Feedback:</strong> {response.gpt_feedback || 'N/A'}%</p>

            {/* {response.suggestions && (
                <div>
                <h3>Suggestions to Improve Your Resume:</h3>
                <ul>
                    {response.suggestions.map((item, index) => (
                    <li key={index}>✅ {item}</li>
                    ))}
                </ul>
                </div>
            )}

            {response.extra_notes && (
                <p><strong>Note:</strong> {response.extra_notes}</p>
            )} */}
            </div>

            <BubbleButton onClick={() => navigate('/upload')}>
            Try Another Resume
            </BubbleButton>
        </div>
        </div>
    </>
  );
};

export default ResponsePage;
