'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const SessionTimeout = ({ 
  timeoutDuration = 15 * 60 * 1000, // 15 minutes default
  warningDuration = 2 * 60 * 1000,  // 2 minutes warning before timeout
  onTimeout,
  onWarning
}) => {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  
  const timeoutIdRef = useRef(null);
  const warningTimeoutIdRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  // Clear all timers
  const clearAllTimers = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    if (warningTimeoutIdRef.current) {
      clearTimeout(warningTimeoutIdRef.current);
      warningTimeoutIdRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  // Handle session timeout
  const handleTimeout = useCallback(() => {
    clearAllTimers();
    setShowWarning(false);
    
    // Clear any session data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sessionActive');
      sessionStorage.clear();
    }
    
    // Call custom timeout handler if provided
    if (onTimeout) {
      onTimeout();
    } else {
      // Default: redirect to homepage or show alert
      alert('Your session has expired due to inactivity.');
      router.push('/');
    }
  }, [onTimeout, router, clearAllTimers]);

  // Show warning before timeout
  const handleWarning = useCallback(() => {
    setShowWarning(true);
    setRemainingTime(warningDuration / 1000); // Convert to seconds
    
    // Start countdown
    countdownIntervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Call custom warning handler if provided
    if (onWarning) {
      onWarning();
    }
    
    // Set final timeout
    timeoutIdRef.current = setTimeout(handleTimeout, warningDuration);
  }, [warningDuration, handleTimeout, onWarning]);

  // Reset timers on user activity
  const resetTimer = useCallback(() => {
    clearAllTimers();
    setShowWarning(false);
    setRemainingTime(0);
    
    // Set warning timer
    warningTimeoutIdRef.current = setTimeout(
      handleWarning, 
      timeoutDuration - warningDuration
    );
    
    // Update session timestamp
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastActivity', Date.now().toString());
      localStorage.setItem('sessionActive', 'true');
    }
  }, [timeoutDuration, warningDuration, handleWarning, clearAllTimers]);

  // Continue session (called from warning dialog)
  const continueSession = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  // Logout immediately
  const logoutNow = useCallback(() => {
    handleTimeout();
  }, [handleTimeout]);

  // Track user activity events
  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    const activityHandler = () => {
      if (!showWarning) {
        resetTimer();
      }
    };

    // Add event listeners
    events.forEach(event => {
      window.addEventListener(event, activityHandler);
    });

    // Initial timer setup
    resetTimer();

    // Check if session was active before page reload
    if (typeof window !== 'undefined') {
      const lastActivity = localStorage.getItem('lastActivity');
      const sessionActive = localStorage.getItem('sessionActive');
      
      if (lastActivity && sessionActive) {
        const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
        if (timeSinceLastActivity > timeoutDuration) {
          handleTimeout();
        }
      }
    }

    // Cleanup
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, activityHandler);
      });
      clearAllTimers();
    };
  }, [resetTimer, showWarning, timeoutDuration, handleTimeout, clearAllTimers]);

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!showWarning) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>⏰ Session Timeout Warning</h2>
        </div>
        
        <div style={styles.body}>
          <p style={styles.message}>
            Your session will expire in <strong style={styles.timer}>{formatTime(remainingTime)}</strong> due to inactivity.
          </p>
          <p style={styles.subMessage}>
            Do you want to continue your session?
          </p>
        </div>
        
        <div style={styles.footer}>
          <button 
            onClick={continueSession}
            style={{...styles.button, ...styles.continueButton}}
          >
            Continue Session
          </button>
          <button 
            onClick={logoutNow}
            style={{...styles.button, ...styles.logoutButton}}
          >
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline styles for the modal
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(5px)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    maxWidth: '500px',
    width: '90%',
    animation: 'slideDown 0.3s ease-out',
  },
  header: {
    padding: '24px 24px 16px 24px',
    borderBottom: '1px solid #e0e0e0',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#333',
    textAlign: 'center',
  },
  body: {
    padding: '24px',
    textAlign: 'center',
  },
  message: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '12px',
  },
  timer: {
    color: '#ff5722',
    fontSize: '24px',
  },
  subMessage: {
    fontSize: '16px',
    color: '#777',
  },
  footer: {
    padding: '16px 24px 24px 24px',
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '140px',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#f44336',
    color: 'white',
  },
};

export default SessionTimeout;
