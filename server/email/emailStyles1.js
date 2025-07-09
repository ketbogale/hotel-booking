module.exports = `
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f7f7fb;
    color: #241654;
    margin: 0;
    padding: 0;
  }
  .email-container {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 8px 32px rgba(36, 22, 84, 0.13);
    max-width: 540px;
    margin: 36px auto;
    padding: 0 0 36px 0;
    border: 1px solid #ececec;
    overflow: hidden;
  }
  .brand {
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
    background: linear-gradient(90deg, #6c63ff 60%, #241654 100%);
    padding: 30px 0 18px 0;
    letter-spacing: 2px;
    font-weight: bold;
    border-bottom-left-radius: 60px 20px;
    border-bottom-right-radius: 60px 20px;
    margin-bottom: 0;
    box-shadow: 0 2px 8px rgba(36,22,84,0.08);
  }
  h2 {
    color: #6c63ff;
    margin: 28px 0 18px 0;
    text-align: center;
    font-size: 1.6rem;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .email-content {
    padding: 0 32px;
  }
  ul.details-list {
    list-style: none;
    padding: 0 32px;
    margin: 0 0 18px 0;
    background: #f7f7fb;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(36,22,84,0.04);
  }
  li {
    margin-bottom: 14px;
    font-size: 1.13rem;
    padding: 8px 0;
    border-bottom: 1px solid #ececec;
  }
  li:last-child {
    border-bottom: none;
  }
  .label {
    font-weight: bold;
    color: #241654;
    font-size: 1.08rem;
    display: inline-block;
    min-width: 120px;
  }
  .footer {
    margin-top: 32px;
    text-align: center;
    color: #b0aac0;
    font-size: 1rem;
    padding-bottom: 10px;
  }
  .highlight {
    color: #6c63ff;
    font-weight: bold;
  }
  .cta-phone {
    display: inline-block;
    background: linear-gradient(90deg, #6c63ff 60%, #241654 100%);
    color: #fff !important;
    font-weight: bold;
    padding: 8px 18px;
    border-radius: 24px;
    text-decoration: none;
    margin-top: 10px;
    font-size: 1.08rem;
    letter-spacing: 1px;
    box-shadow: 0 2px 8px rgba(36,22,84,0.08);
    transition: background 0.2s;
  }
  .cta-phone:hover {
    background: linear-gradient(90deg, #241654 60%, #6c63ff 100%);
    color: #fff !important;
  }
  @media (max-width: 600px) {
    .email-container {
      padding: 0 0 18px 0;
      max-width: 98vw;
    }
    .email-content, ul.details-list {
      padding: 0 8vw;
    }
    h2 {
      font-size: 1.1rem;
    }
    .brand {
      font-size: 1.1rem;
      padding: 18px 0 10px 0;
    }
  }
`;