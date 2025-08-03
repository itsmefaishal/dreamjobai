import React, { Suspense, useEffect, useState } from 'react';
import BubbleButton from './BubbleButton';
import AuthModal from './AuthModal';
import HamburgerMenu from './HamburgerMenu';
import '../styles/Navbar.css';
import { auth } from '../../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authFormType, setAuthFormType] = useState('login'); // track login/signup
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // This makes it reactive
      // console.log(currentUser);
    });

    
    return () => unsubscribe();
  }, []);

  const handleLogOut = async () => {
    await signOut(auth);
    setUser(null);
  }

  const handleLogIn = () => {
    setMenuOpen(false);
    setAuthFormType('login');
    setShowModal(true);
  };

  const handleSignUp = () => {
    setMenuOpen(false);
    setAuthFormType('signup');
    setShowModal(true);
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">DreamJob</h2>

        {user ? (
          <>
            <div className="auth-buttons desktop-only">
              <span className="welcome-msg">Hi, {user.email}</span>
              <BubbleButton onClick={handleLogOut}>Logout</BubbleButton>
            </div>
          </>
        ) : (
          <>
            <div className="auth-buttons desktop-only">
              <BubbleButton onClick={handleLogIn}>Login</BubbleButton>
              <BubbleButton onClick={handleSignUp}>Signup</BubbleButton>
            </div>
          </>
        )}

        <div className="hamburger-icon mobile-only" onClick={() => setMenuOpen(true)}>
          ☰
        </div>
      </nav>

      {/* Mobile Hamburger Menu */}
      {menuOpen && (
        <HamburgerMenu
          onLoginClick={handleLogIn}
          onSignupClick={handleSignUp}
          onLogoutClick={handleLogOut}
          user={user}
          onClose={() => setMenuOpen(false)}
        />
      )}

      {/* Login/Signup Modal */}
      {showModal && (
        <AuthModal
          defaultForm={authFormType}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
