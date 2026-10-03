import express from "express";

import session from "express-session";
import pgSession from "connect-pg-simple";

const app = express();
app.use(express.json());

app.use(session({
    
}))

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});