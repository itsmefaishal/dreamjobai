import { motion } from 'framer-motion';
import BubbleButton from './BubbleButton';
import '../styles/HamburgerMenu.css';

const HamburgerMenu = ({ onLoginClick, onSignupClick, onClose, user, onLogoutClick }) => {
  return (
    <motion.div
      className="hamburger-menu"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <div className="menu-content">
        <button className="close-btn" onClick={onClose}>✕</button>
        {
          user ? (
            <>
              <span>Hi {user.email}</span>
              <BubbleButton onClick={onLogoutClick}>LogOut</BubbleButton>
            </>
          ) : (
            <>
              <BubbleButton onClick={onLoginClick}>Login</BubbleButton>
              <BubbleButton onClick={onSignupClick}>Signup</BubbleButton>
            </>
          )
        }
      </div>
    </motion.div>
  );
};

export default HamburgerMenu;
