import React, { useState } from 'react';
import axios from 'axios';
import '../../css/RegisterCompo.css'; // Import the CSS file

export default function RegisterCompo() {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/createuser', formData);
      console.log('Registration Successful:', response.data);
      alert('Registration Successful');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label">Full Name</label>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="label">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  );
}
