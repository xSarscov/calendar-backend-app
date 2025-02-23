const { response } = require('express');
const { validationResult } = require('express-validator');
const { createJwt } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: "Email already exists."
            })
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
    
        await user.save();

        const token = await createJwt(user.id, user.name);
    
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.',
        })
    }
}

const userSignin = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid email or password."
            })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid password."
            });
        }

        const token = await createJwt(user.id, user.name);

        return res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log({error})
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong.',
        })
    }
}

const tokenRenew = async(req, res = response) => {

    const { uid, name } = req;

    const token = await createJwt(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = { 
    createUser, 
    userSignin, 
    tokenRenew, 
}