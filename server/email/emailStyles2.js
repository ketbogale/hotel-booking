// ... existing code ...

module.exports.emailStyles2 = `
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #f8fafc 0%, #e0eafc 100%);
    margin: 0;
    padding: 24px;
    color: #222;
  }
  .profile-email-container {
    max-width: 520px;
    margin: 0 auto;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.10);
    overflow: hidden;
    border: 1.5px solid #e0eafc;
  }
  .profile-email-header {
    background: linear-gradient(90deg, #1976d2 60%, #8ec5fc 100%);
    color: #fff;
    padding: 32px 24px 18px 24px;
    text-align: center;
    border-bottom-left-radius: 60px 18px;
    border-bottom-right-radius: 60px 18px;
  }
  .profile-email-header h1 {
    font-size: 2.1rem;
    font-weight: 700;
    margin: 0 0 8px 0;
    letter-spacing: 0.5px;
  }
  .profile-email-header p {
    font-size: 1.08rem;
    margin: 0;
    opacity: 0.95;
  }
  .profile-email-content {
    padding: 32px 24px 18px 24px;
    color: #222;
    font-size: 1.08rem;
    line-height: 1.7;
  }
  .profile-email-content p {
    margin-bottom: 14px;
  }
  .profile-email-content strong {
    color: #1976d2;
    font-weight: 600;
  }
  .profile-email-image {
    text-align: center;
    margin: 28px 0 18px 0;
  }
  .profile-email-image img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #1976d2;
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
  }
  .profile-email-footer {
    background: #f5f7fa;
    padding: 18px 24px;
    text-align: center;
    color: #888;
    font-size: 0.98rem;
    border-top: 1px solid #e0eafc;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
  }
  @media only screen and (max-width: 600px) {
    .profile-email-container {
      border-radius: 0;
      box-shadow: none;
    }
    .profile-email-header, .profile-email-content, .profile-email-footer {
      padding-left: 8px;
      padding-right: 8px;
    }
    .profile-email-header {
      border-bottom-left-radius: 30px 10px;
      border-bottom-right-radius: 30px 10px;
    }
  }
`;
// ... existing code ...