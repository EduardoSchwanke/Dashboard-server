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

        try{
            const user = await User.findOne({
                username: username,
                password: password
            })

            if(!user){
                return res.status(400).json('name or password not validated.')
            }

            return res.status(200).json({ user })
        }catch(err){
            res.status(400).json({ error: err.message })
        }
    },
    async user(req, res){
        const { token } = req.body

        try{
            const user = await User.findById(token)
            if(!user){
                return res.status(400).json('id not validated.')
            }
            return res.status(200).json({user})
        }catch(err){
            res.status(400).json({ error: err.message })
        }
    }
}