const paymentEmailStyles = `
  body {
    background: linear-gradient(135deg, #f4f6fb 60%, #e9e4d5 100%);
    font-family: 'Segoe UI', 'Arial', 'Georgia', serif;
    margin: 0;
    padding: 0;
  }
  .email-container {
    max-width: 540px;
    margin: 40px auto;
    background: #fffbe9;
    border-radius: 22px;
    box-shadow: 0 8px 36px rgba(44, 62, 80, 0.13);
    padding: 44px 32px 32px 32px;
    border: 1.8px solid #e0e7ff;
    border-top: 4px solid #d4af37;
    border-bottom: 4px solid #d4af37;
  }
  .email-header {
    text-align: center;
    margin-bottom: 28px;
  }
  .email-header img {
    width: 80px;
    margin-bottom: 12px;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(44, 62, 80, 0.10);
    border: 2px solid #d4af37;
    background: #fff;
  }
  .email-title {
    color: #bfa14a;
    font-size: 2rem;
    font-family: 'Georgia', 'Times New Roman', serif;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: 0.7px;
    text-shadow: 0 1px 0 #fffbe9;
  }
  .email-subtitle {
    color: #2d2154;
    font-size: 1.18rem;
    margin-bottom: 26px;
    font-weight: 500;
    font-family: 'Segoe UI', 'Arial', serif;
  }
  .booking-summary {
    background: #f8f6f0;
    border-radius: 14px;
    padding: 24px 20px;
    margin-bottom: 28px;
    box-shadow: 0 2px 10px rgba(52,96,219,0.08);
    border: 1.5px solid #e0e7ff;
  }
  .booking-summary ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 1.13rem;
    color: #222;
  }
  .booking-summary li {
    margin-bottom: 14px;
    padding-bottom: 7px;
    border-bottom: 1px solid #e0e7ff;
    font-size: 1.11rem;
    letter-spacing: 0.12px;
  }
  .booking-summary li:last-child {
    border-bottom: none;
  }
  .email-footer {
    text-align: center;
    margin-top: 34px;
    color: #6b5e3c;
    font-size: 1.07rem;
    line-height: 1.8;
    font-family: 'Segoe UI', 'Arial', serif;
  }
  .email-support-link {
    color: #bfa14a;
    text-decoration: underline;
    font-weight: 600;
  }
  .email-footer img {
    margin-top: 18px;
    width: 62px;
    opacity: 0.85;
  }
  @media (max-width: 600px) {
    .email-container {
      padding: 16px 2vw 20px 2vw;
    }
    .booking-summary {
      padding: 10px 2vw;
    }
    .email-title {
      font-size: 1.25rem;
    }
    .email-header img {
      width: 48px;
    }
  }
`;

module.exports = paymentEmailStyles;