import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // "Bearer TOKEN" → "TOKEN"

    if (!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    try {
        // Verify the token using our secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // attach user info to the request
        next() // continue to the actual endpoint
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' })
    }
}

export function requireRole(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' })
        }
        next()
    }
}