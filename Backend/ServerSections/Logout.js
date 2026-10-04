import express from 'express';

export const logoutRouter = express.Router()

logoutRouter.post('/', (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({ message: 'Could not log out, please trye again later.' })
    }
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Could not log out, please trye again later.' })
            }
            res.clearCookie('session_cookie')
            return res.status(200).json({ message: 'Logged out successfully' });
        })
    })
})