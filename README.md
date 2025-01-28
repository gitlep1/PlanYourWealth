# Plan Your Wealth

Plan Your Wealth is a full-stack financial management application that enables users to organize their accounts, track transactions, and manage their finances efficiently. With robust features and an intuitive user interface, Plan Your Wealth helps users achieve their financial goals.

## Table of Contents

- [Deployed Links](#deployed-links)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Setup Instructions](#setup-instructions)
- [Backend Dependencies](#backend-dependencies)
- [Frontend Dependencies](#frontend-dependencies)

---

## Deployed Links

- [Front-End](https://plan-your-wealth.vercel.app)
- [Back-End](https://plan-your-wealth-api.vercel.app)
- [GitHub-MonoRepo](https://github.com/gitlep1/PlanYourWealth)

---

## Features

- **User Authentication**: Secure user login using JSON Web Tokens (JWT).
- **Account Management**: Create, edit, and delete financial accounts.
- **Transaction Tracking**: Record transactions with categories, amounts, and notes.
- **Data Visualization**: View charts of financial activity using Chart.js.
- **Custom Themes**: Users can customize their dashboard theme.
- **Email Notifications**: Verify emails and send notifications using Nodemailer.
- **Responsive Design**: A seamless user experience on both mobile and desktop.

---

## Technologies Used

### Backend

- **Node.js** with **Express.js** for server-side logic.
- **PostgreSQL** with **pg-promise** for database management.
- **jsonwebtoken** for authentication and user security.
- **Nodemailer** for email handling.

### Frontend

- **React** for building the user interface.
- **React Router DOM** for navigation.
- **Bootstrap** and **Sass** for styling.
- **Chart.js** for data visualization.
- **React Toastify** for interactive notifications.

---

## Database Schema

### Tables

1. **Users**

   - Stores user information including email, username, password, profile image, and theme settings.

2. **Accounts**

   - Tracks user accounts, account types, balances, and associated notes.

3. **Transactions**

   - Records transactions associated with accounts, including type, amount, date, category, and notes.

4. **Email Verification**
   - Manages email verification codes and timestamps.

### ER Diagram

- A user can have multiple accounts.
- Each account can have multiple transactions.
- Email verification is tied to a user's email.

---

## Setup Instructions

### Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

### Backend Setup

1. Clone the repository and navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the following environment variables:
   ```bash
    PORT=<your port>
    PG_HOST=localhost
    PG_DATABASE=<your database name>
    PG_USER=<your postgres user>
    PG_PASSWORD=<your postgres password>
    PG_PORT=<your postgres port>
    JWT_SECRET=<your jsonwebtoken secret>
    EMAIL_HOST=<your email host>
    USER=<your user from the email host>
    PASS=<your pass from the email host>
    EMAIL=<the email you will be sending from>
   ```
4. Run the PostgreSQL database migrations:
   ```bash
   npm run dbinit
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at http://localhost:5173.

---

## Backend Dependencies

```bash
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "express-jwt": "^8.5.1",
  "google-auth-library": "^9.15.0",
  "jsonwebtoken": "^9.0.2",
  "nodemailer": "^6.10.0",
  "nodemon": "^3.1.9",
  "pg": "^8.13.1",
  "pg-promise": "^11.10.2"
```

---

## Frontend Dependencies

```bash
  "axios": "^1.7.9",
  "bootstrap": "^5.3.3",
  "chart.js": "^4.4.7",
  "jest": "^29.7.0",
  "js-cookie": "^3.0.5",
  "jsonwebtoken": "^9.0.2",
  "mathjs": "^14.0.1",
  "react": "^18.3.1",
  "react-bootstrap": "^2.10.8",
  "react-chartjs-2": "^5.3.0",
  "react-dom": "^18.3.1",
  "react-icons": "^5.4.0",
  "react-router-dom": "^7.1.3",
  "react-spring": "^9.7.5",
  "react-toastify": "^11.0.3",
  "sass": "^1.83.4"
```

---

## Dev Dependencies

```bash
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react-swc": "^3.5.0",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0",
  "vite": "^6.0.5"
```

---

## License

This project is licensed under the MIT License.
