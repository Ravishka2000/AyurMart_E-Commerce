import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from 'emailjs-com';

const ContactWrapper = styled(Box)({
  justifyContent: 'center',
  display: 'grid',
  gridTemplateColumns: '3fr 2fr',
  padding: '20px',
});

const ContactFormContainer = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '10px',
  padding: '30px',
  maxWidth: '500px',
  width: '100%',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
});

const ContactForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'right',
  marginTop: '90px',
  '& .MuiTextField-root': {
    marginBottom: '10px',
    width: '100%',
  },
  '& .MuiButton-root': {
    marginTop: '20px',
    width: '100%',
    borderRadius: '20px',
    padding: '10px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#2c387e',
    },
  },
});


const ContactInput = styled(TextField)({
  marginBottom: '20px',
  width: '100%',
});

const ContactButton = styled(Button)({
  marginTop: '20px',
  width: '100%',
});

const ContactBanner = styled(Box)({
  color: '#262A56',
  padding: '10px',
  width: '100%',
  textAlign: 'center',
  marginTop: '75px',
  backgroundImage: 'url(https://img.freepik.com/free-vector/medicine-concept-illustration_114360-1644.jpg?w=740&t=st=1681059580~exp=1681060180~hmac=99b33a6a74a9d98999e82769586bb400d51a64504ecbf3cd6767174497c00184)',
});


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
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
      user_phone: phone,
      subject: subject,
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
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <ContactWrapper>
      
      <ContactBanner>
        <Typography variant="h4" fontWeight="bold">
        {<br/>}{<br/>}Contact Us
        </Typography>
        <Typography variant="subtitle1">
        {<br/>}{<br/>}We would love to hear from you. Contact us by email, phone or visit our store.
        </Typography>
           
          <Typography variant="subtitle1" fontWeight="bold">
          {<br/>}{<LocationOnIcon />}123 Main Street, Anytown USA  
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
          {<LocalPhoneIcon />}(123) 456-7890
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">
           {<EmailIcon />}example@example.com
          </Typography>
        
      </ContactBanner>

      <ContactFormContainer>
      <ContactForm onSubmit={handleSubmit}>
        <ContactInput
          label="Name"
          variant="outlined"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <ContactInput
          label="Email"
          variant="outlined"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <ContactInput
          label="Phone"
          variant="outlined"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <ContactInput
          label="Subject"
          variant="outlined"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <ContactInput
          label="Message"
          variant="outlined"
          required
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <ContactButton
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          type="submit"
        >
          Send
        </ContactButton>
      </ContactForm>
      </ContactFormContainer>
    </ContactWrapper>
  );
};

export default Contact;


        