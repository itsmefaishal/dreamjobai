import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/AuthModal.css';
import BubbleButton from './BubbleButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

const AuthModal = ({ onClose, defaultForm = 'login'}) => {
  const [isSignUp, setIsSignUp] = useState(defaultForm === 'signup');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try{
      await signInWithEmailAndPassword(auth, email, password)
    }
    catch(error){
      alert(error.message)
    }
  }

  const handleSignUp = async () => {
    try{
      await createUserWithEmailAndPassword(auth,email,password);
    }
    catch(error){
      alert(error.message)
    }
  }

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-box-container"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <button className="auth-close-btn" onClick={onClose}>✕</button>

        <div className="auth-card-wrapper">
          <form onSubmit={(e) => e.preventDefault()}>
            {isSignUp ? (
              <div className="auth-card">
                <h3>Signup</h3>
                {/* <input type="text" placeholder="Username" className="auth-input" /> */}
                <input type="email" placeholder="Email" className="auth-input" 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password" className="auth-input" 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <BubbleButton
                    type='submit'
                    onClick={handleSignUp}
                >Signup</BubbleButton>
                <p className="auth-toggle-text">
                  Already have an account?{' '}
                  <button className="auth-toggle-btn" 
                    onClick={() => setIsSignUp(false)}
                    >
                    Login
                  </button>
                </p>
              </div>
            ) : (
              <div className="auth-card">
                <h3>Login</h3>
                <input type="email" placeholder="email" className="auth-input" 
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password" className="auth-input" 
                  onChange={(e) => setPassword(e.target.value)}
                />
                <BubbleButton
                    type='submit'
                    onClick={handleLogin}
                >Login</BubbleButton>
                <p className="auth-toggle-text">
                  Don't have an account?{' '}
                  <button className="auth-toggle-btn" onClick={() => setIsSignUp(true)}>
                    Signup
                  </button>
                </p>
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
