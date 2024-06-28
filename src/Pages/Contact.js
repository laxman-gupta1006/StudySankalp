import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message
        };

        emailjs.send('service_3a9qcrn', 'template_lidhkrn', templateParams, 'fqBerxTxipMaSDj7_')
            .then((result) => {
                console.log(result.text);
                setStatus('SUCCESS');
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            }, (error) => {
                console.log(error.text);
                setStatus('ERROR');
            });
    };

    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <p>Email: <a href="mailto:studysankaalp@gmail.com">studysankaalp@gmail.com</a></p>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Message:
                    <textarea name="message" value={formData.message} onChange={handleChange} required />
                </label>
                <button type="submit">Send</button>
            </form>
            {status === 'SUCCESS' && <p className="success-message">Message sent successfully!</p>}
            {status === 'ERROR' && <p className="error-message">Failed to send message. Please try again.</p>}
        </div>
    );
};

export default Contact;
