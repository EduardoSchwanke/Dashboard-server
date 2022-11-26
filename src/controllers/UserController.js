const User = require('../models/User')
const { v4: uuid } = require('uuid')
const mailer = require('../modules/mailer')

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
        const { username, password, email } = req.body

        if(!username || !password || !email){
            return res.status(400).json({error: "missing username or password"})
        }

        const user = new User({
            _id: uuid(),
            username,
            password,
            email
        })

        if(await User.findOne({ email }) || await User.findOne({ username })){
            return res.status(400).json({ error: 'Username or email existed' })
        }

        try{
            await user.save()
            return res.status(201).json({ user })
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
    },
    async forgotPassword(req, res) {
        const { email } = req.body

        try{
            const {username, password} = await User.findOne({email})
            console.log({password})
            if(!username)
                return res.status(400).json({ error: 'email not existed' })
            
            mailer.sendMail({
                to: email,
                from: "carvalhoe089@gmail.com",
                template: 'forgot_password',
                context: {username, password}
            }, (err) => {
                if(err){
                    console.log(err)
                    res.status(400).json({ error: 'cannot send email' })
                }
                return res.send()
            })
        }catch(err){
            res.status(400).json({ error: 'error on forgot password' })
        }
    }
}