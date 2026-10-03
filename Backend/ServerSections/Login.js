import express from "express";
import passport from "passport";

export const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => {
    passport.authenticate("local", (err, user, information) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ information: information.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return(next(err));
            }
            return res.status(200).json({ message: "Login successful", user: user });
        })
    })(req, res, next);
})