import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 10, color = '#FFF' }) => {
  return (
    <span 
      className={styles.loader}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        color: color
      }}
    ></span>
  );
};

export default Loader;
