import { motion } from 'framer-motion';

const BubbleButton = ({ children, onClick, type = "button", style = {} }) => {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.9, transition: { type: 'spring', stiffness: 500, damping: 10 } }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      style={{
        padding: '0.6rem 1.5rem',
        background: 'linear-gradient(135deg, #4bdaa1ff 0%, #336fcfff 100%)',
        border: 'none',
        borderRadius: '15px', // FULLY ROUNDED
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
};

export default BubbleButton;
