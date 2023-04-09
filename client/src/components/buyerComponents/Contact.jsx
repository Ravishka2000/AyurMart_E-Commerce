import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and user ID
    const serviceId = 'service_h7xt39f';
    const templateId = 'template_v2iyihd';
    const userId = 'Myu300hXPjTNU2FtZ';

    // Send the form data via EmailJS
    emailjs.send(serviceId, templateId, {
      user_name: name,
      user_email: email,
      message,
    }, userId)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });

    // Reset the form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />

        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;