// server/email/emailStyles.js
module.exports = `
  /* Reset and Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    margin: 0;
    padding: 20px;
    line-height: 1.6;
    color: #2c3e50;
  }
  
  /* Email Container */
  .email-container {
    max-width: 600px;
    margin: 0 auto;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
  }
  
  /* Header Section */
  .header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    padding: 40px 30px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.1)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
  
  .header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    position: relative;
    z-index: 1;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header p {
    font-size: 1.1rem;
    margin: 10px 0 0 0;
    opacity: 0.9;
    position: relative;
    z-index: 1;
  }
  
  /* Content Section */
  .content {
    padding: 40px 30px;
    color: #2c3e50;
    font-size: 1.1rem;
    line-height: 1.7;
  }
  
  .content p {
    margin-bottom: 15px;
  }
  
  .content strong {
    color: #34495e;
    font-weight: 600;
  }
  
  /* Details Section */
  .details {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 15px;
    padding: 25px;
    margin: 25px 0;
    border-left: 5px solid #667eea;
    position: relative;
  }
  
  .details h3 {
    color: #2c3e50;
    font-size: 1.3rem;
    margin-bottom: 15px;
    font-weight: 600;
  }
  
  .details p {
    margin: 8px 0;
    color: #34495e;
    font-size: 1rem;
  }
  
  .details strong {
    color: #2c3e50;
    font-weight: 600;
  }
  
  /* Button Styles */
  .button {
    display: inline-block;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff !important;
    padding: 16px 32px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  .button:hover::before {
    left: 100%;
  }
  
  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  }
  
  /* Footer Section */
  .footer {
    background: #f8f9fa;
    padding: 30px;
    text-align: center;
    color: #7f8c8d;
    font-size: 0.95rem;
    border-top: 1px solid #e9ecef;
  }
  
  .footer p {
    margin-bottom: 10px;
  }
  
  .footer ul {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }
  
  .footer li {
    margin: 8px 0;
    padding-left: 20px;
    position: relative;
  }
  
  .footer li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
  }
  
  /* Status Indicators */
  .status-active {
    color: #27ae60;
    font-weight: bold;
  }
  
  .status-pending {
    color: #f39c12;
    font-weight: bold;
  }
  
  /* Responsive Design */
  @media only screen and (max-width: 600px) {
    body {
      padding: 10px;
    }
    
    .email-container {
      border-radius: 15px;
    }
    
    .header {
      padding: 30px 20px;
    }
    
    .header h1 {
      font-size: 2rem;
    }
    
    .content {
      padding: 30px 20px;
      font-size: 1rem;
    }
    
    .details {
      padding: 20px;
      margin: 20px 0;
    }
    
    .button {
      padding: 14px 28px;
      font-size: 1rem;
    }
    
    .footer {
      padding: 25px 20px;
    }
  }
  
  /* Animation Classes */
  .fade-in {
    animation: fadeIn 0.8s ease-in;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Special Effects */
  .highlight {
    background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
  }
  
  .success-badge {
    display: inline-block;
    background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;