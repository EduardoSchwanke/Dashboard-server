const User = require('../models/User')
const { v4: uuid } = require('uuid')

module.exports = {
    async index(req, res){
        try {
            const Users = await User.find()
            return res.status(200).json({ Users })
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    },
    async store(req, res){
        const { username, password } = req.body

        if(!username || !password){
            return res.status(400).json({error: "missing username or password"})
        }

        const user = new User({
            _id: uuid(),
            username,
            password
        })

        try{
            await user.save()
            return res.status(201).json({ message: 'user added with succesfully!'})
        } catch (err){
            res.status(400).json({ error: err.message })
        }
    },

    async login(req, res){
        const { username, password } = req.body

        if(!username || !password){
            return res.status(400).json({error: "missing username or password"})
        }
        
    }
}