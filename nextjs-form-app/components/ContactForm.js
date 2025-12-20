import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitFormRequest, resetForm } from '../redux/actions/formActions';
import styles from '../styles/ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.form);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name should only contain letters';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';

      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\d{10}$/.test(value.replace(/[\s-]/g, ''))) return 'Phone number must be 10 digits';
        return '';

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(submitFormRequest(formData));
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    setErrors({});
    setTouched({});
    dispatch(resetForm());
  };

  useEffect(() => {
    if (success) {
      // Reset form after successful submission
      setTimeout(() => {
        handleReset();
      }, 3000);
    }
  }, [success]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>Fill out the form below and we'll get back to you soon!</p>

        {success && (
          <div className={styles.successMessage}>
            ✓ Form submitted successfully! We'll contact you soon.
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && touched.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && touched.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.phone && touched.phone ? styles.inputError : ''}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && touched.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="5"
              className={`${styles.textarea} ${errors.message && touched.message ? styles.inputError : ''}`}
              placeholder="Enter your message"
            />
            {errors.message && touched.message && (
              <span className={styles.errorText}>{errors.message}</span>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              disabled={loading}
              className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
