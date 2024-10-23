const User = require('../models/user');
const jwt = require('jsonwebtoken');

//create user
const Createuser = async (req, res) =>{
    try{
        const {fname, mname, email, phone_number, password, role} = req.body;
        const user = new User({fname, mname, email, phone_number, password, role});
        await user.save();
        return res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Internel server error'});
    }
}

//get all user data
const getuser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: 'No token, authorization denied' });
        }

        jwt.verify(token, process.env.REACT_APP_JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Token is not valid' });
            }

            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(user);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    Createuser,
    getuser
}