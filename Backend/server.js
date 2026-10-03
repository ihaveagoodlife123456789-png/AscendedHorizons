import express from "express";

import session from "express-session";
import pgSession from "connect-pg-simple";

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://ascendedhorizons.com', credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'session_cookie',
  cookie: {
    domain: 'ascendedhorizons.com',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 2
  }
}))

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});