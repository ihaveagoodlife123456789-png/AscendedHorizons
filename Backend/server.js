import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import { pool } from "./index.js";
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt';

import { loginRouter } from "./ServerSections/Login.js";
import { registerRouter } from "./ServerSections/Register.js"

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://ascendedhorizons.com', credentials: true }));

const PostgresStore = pgSession(session)

app.use(session({
  store: new PostgresStore({
    pool: pool,
    tableName: 'UserSession',
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET ? process.env.SESSION_SECRET : 'default_secret',
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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(async (user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const searchUser = `SELECT * FROM users WHERE id = $1`
    const { rows } = await pool.query(searchUser, [id])
    if(rows.length > 0) {
      return done(null, rows[0])
    }
    return done(null, false)
  } catch (err) {
    done(err)
  }
})

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async function(email, password, done) {
    try {
      const searchUserQuery = `SELECT * FROM users WHERE email = $1`;
      const { rows } = await pool.query(searchUserQuery, [email.toLowerCase()]);
      const user = rows[0];
      if(!user) {
        return done(null, false, { message: 'Incorrect email.'});
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if(!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.'});
      }
      return done(null, user);
    } catch (err) {
      return done(err)
    }
  }
))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter)


const distPath = path.join(__dirname, '../Frontend/dist');
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});


const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});