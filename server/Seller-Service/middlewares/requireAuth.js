import jwt from 'jsonwebtoken';
import Seller from '../models/Seller.js'

const requireAuth = async (req, res, next) => {

    // verify seller is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)

        req.seller = await Seller.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

export default requireAuth;