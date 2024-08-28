import React, { useState } from 'react';
import './Settings.sass'; // Sass dosyasını burada kullanın

const Settings = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleThemeChange = (e) => setTheme(e.target.value);
  const handleNotificationChange = (type) => {
    setNotifications((prevState) => ({
      ...prevState,
      [type]: !prevState[type]
    }));
  };

  return (
    <div className="Settings">
      <h2>Settings</h2>
      <div className="section">
        <h3>Profile</h3>
        <div className="input-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
      </div>
      
      <div className="section">
        <h3>Theme</h3>
        <div className="input-group">
          <label>Select Theme:</label>
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="section">
        <h3>Notifications</h3>
        <div className="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={notifications.email} 
              onChange={() => handleNotificationChange('email')} 
            />
            Email Notifications
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={notifications.sms} 
              onChange={() => handleNotificationChange('sms')} 
            />
            SMS Notifications
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={notifications.push} 
              onChange={() => handleNotificationChange('push')} 
            />
            Push Notifications
          </label>
        </div>
      </div>
      
      <button className="save-button">Save Changes</button>
    </div>
  );
};

export default Settings;
