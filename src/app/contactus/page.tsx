"use client"
import React, { useState, useEffect } from "react";
import styles from './styles.module.css';

interface ContactForm {
  email: string;
  phone: string;
  advantageCardNumber?: string; // Optional advantage card number
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    email: '',
    phone: '',
    advantageCardNumber: '',
    message: '',
  });

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [formError, setFormError] = useState(false);

  useEffect(()=>
  {
    const storedFormData=sessionStorage.getItem('formData');
    if(storedFormData)
    {
      setFormData(JSON.parse(storedFormData));
    }
  },[]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    // Reset error state for the corresponding input
    switch (name) {
      case 'email':
        setEmailError(false);
        break;
      case 'phone':
        setPhoneError(false);
        break;
      case 'message':
        setDescError(false);
        break;
      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Check if any required field is empty
    if (!formData.email || !formData.phone || !formData.message) {
      setFormError(true);
      alert('Please fill in all required fields.');
      return;
    }

    // Reset form error state
    setFormError(false);

    // Validation logic
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      sessionStorage.setItem('formData',JSON.stringify(formData));
      alert('Please enter a valid email address.');
      window.location.href="http://localhost:3000/error"
      return;
    }

    if (!validatePhone(formData.phone)) {
      setPhoneError(true);
      alert('Please enter a valid phone number with exactly 10 digits.');
      return;
    }

    if (!validateDescription(formData.message)) {
      setDescError(true);
      alert('Please enter a description between 100 and 250 characters.');
      return;
    }

    // If all fields are filled and validated, handle form submission
    handleFormSubmit(formData);
    window.location.href="http://localhost:3000/success";
  };

  const handleFormSubmit = (data: ContactForm) => {
    // Implement form submission logic here, e.g., send data to server
    console.log('Form submitted:', data);
    sessionStorage.removeItem('formData');
    
    alert('Thank you for contacting us! Your message has been sent.');
  };

  const validateEmail = (email: string): boolean => {
    // Very basic email validation, you can use a more robust solution if needed
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Validate phone number to have exactly 10 digits
    return /^\d{10}$/.test(phone);
  };

  const validateDescription = (description: string): boolean => {
    // Validate description to have characters ranging from 100 to 250
    const length = description.trim().length;
    return length >= 100 && length <= 250;
  };
 

  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Contact Us</h1>
      {/* {formError && <p className={styles.error}>All fields are required</p>} */}
      <div className={styles.form}>
        <input
          className={`${styles.input} ${emailError ? styles.error : ''}`}
          placeholder="Email"
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
        <input
          className={`${styles.input} ${phoneError ? styles.error : ''}`}
          placeholder="Phone Number"
          type="text"
          value={formData.phone}
          name="phone"
          onChange={handleChange}
        />
      </div>
      <div className={styles.form}>
        <textarea
          className={`${styles.inputBox} ${descError ? styles.error : ''}`}
          placeholder="Please enter your description (100-250 characters)"
          //type="text"
          value={formData.message}
          name="message"
          onChange={handleChange}
        />
        <input
          className={styles.input}
          placeholder="Advantage Card Number (Optional)"
          type="text"
          value={formData.advantageCardNumber}
          name="advantageCardNumber"
          onChange={handleChange}
        />
      </div>
      <p className={styles.contact}>If your inquiry is urgent, you can contact our customer care team directly.</p>
      <p className={styles.contactNo}>1-800-553-2324</p>
      <p className={styles.time}>Mon-Fri 9:00am - 9:00pm(ET)</p>
      <button className={styles.buttonSubmit} onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ContactForm;
