import express from "express";
import passport from "passport";

export const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => {
    passport.authenticate("local", (err, user, information) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            const message = information?.message || "Invalid username or password."
            return res.status(401).json({ message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return(next(err));
            }
            return res.status(200).send({ message: 'Successfully logged in!', user: user})
        })
    })(req, res, next);
})