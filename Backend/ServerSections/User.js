import express from 'express'

export const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    try {
        if(!req.user) {
            return res.status(401).json({ message: 'Please login first'})
        }
        console.log(req.user)
        return req.status(200).json(req.user)
    } catch (err) {
        return res.status(401).json({ message: 'Server Error'})
    }
})