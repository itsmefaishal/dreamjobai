import { useEffect, useState } from 'react';
import '../styles/UploadForm.css';
import BubbleButton from './BubbleButton';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

const UploadForm = ({setResponse}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!resume || !jd){
      alert("Complete the form")
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("resume", resume);
    form.append("jd", jd);

    try{
      const user = auth.currentUser;
      const token = user.getIdToken();

      const res = await fetch("http://127.0.0.1:8000/upload", {
        method : "POST",
        headers : {
          Authorization : `Bearer ${token}`
        },
        body : form
      })

      const data = await res.json();
      console.log(data);
      setResponse(data);
      setLoading(false);
      navigate('/response');
    }
    catch(error){
      alert(error.message);
    }
  };


  return (
    <div className="upload-container">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2>Upload a Job Description</h2>
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        <textarea
          placeholder="Put the job description"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />
        <BubbleButton type="submit">
          {
            loading ? "Uploading..." : "Submit"
          }
        </BubbleButton>
      </form>
    </div>
  );
};

export default UploadForm;
