# Hotel Booking System Project
This project is intended for hotel booking system or reservation for anyone who 
want to book hotel.
This for education purpose not fully functional

---

```markdown
# Hotel Booking Project

A modern hotel booking web application with a Node.js as backend and a responsive HTML/CSS/JavaScript frontend.

## Features

- User registration and login
- Secure password reset via email
- Email notifications for users and admins
- Booking notifications for user with their details
- Room gallery and booking pages
- Modern, responsive design
- Easy online payment via chapa

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js
- Database: Cloud MongoDB
- Email: Nodemailer (Gmail SMTP), Gmail app password

## Getting Started

### Prerequisites
- Email verification 
- Node.js and npm installed
- MongoDB installed and running or using cloud mongo atlas
- A Gmail account for sending emails
- Gmail app password for security

### Installation

1. Clone the repository:
 - Creating repository called hotelbooking
 - Push it to github repository 
   ```

2. Install backend dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following content:
   ```
   MONGO_URI=your_mongodb_connection_string or cloud or local mongo compass
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   ADMIN_EMAIL=admin@example.com
   Use .gitignore for this and it is not visible in the hard code
   ```

4. Start the backend server:
   ```sh
   npm start
   ```

5. Open `public/html/index.html` in your browser to view the frontend.

## Folder Structure

```
HotelBookingProject/
  public/
    html/
    js/
    styles/
    src/
  server/
    config/
    controllers/
    models/
    routes/
    server.js
  package-lock.json
  package.json
  README.md

```

## License

This project is for educational purposes
Just for developing skill

---

Feel free to modify this template to better fit your project! 
If you want a more detailed or customized README
