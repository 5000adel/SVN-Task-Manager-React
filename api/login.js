import supabase from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const { username, password } = req.body

    // Basic input validation
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' })
    }

    try {
        // 1. Find the user by username
        const { data: user, error } = await supabase
            .from('tbl_users')
            .select('user_id, username, first_name, last_name, role, availability_status, experience_years, password_hash')
            .eq('username', username)
            .single()

        // 2. If no user found, return a vague error (security best practice —
        //    never tell the client whether the username or password was wrong)
        if (error || !user) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        // 3. Compare the submitted password against the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password_hash)
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' })
        }

        // 4. Create a JWT token with the user's id and role
        const token = jwt.sign(
            { user_id: user.user_id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '8h' } // token expires after 8 hours
        )

        // 5. Return the token and user info (never return password_hash)
        const { password_hash, ...userWithoutPassword } = user
        return res.status(200).json({
            token,
            user: userWithoutPassword
        })

    } catch (err) {
        console.error('Login error:', err)
        return res.status(500).json({ error: 'Internal server error' })
    }
}