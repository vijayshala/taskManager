const express = require('express');
const router = new express.Router();
const Users = require("../models/user.js")

router.post('/user' ,async (req,res)=>{
    const user = new Users(req.body);
    try{
        await user.save();
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})


router.post('/user/login' , async (req,res)=>{
    try{
        const user = await Users.findByCredentials(req.body.email , req.body.password);
        //res.status(201).send(user)
        const token = await user.generateAuthToken()
        //console.log(token)
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})

router.get('/user' , async (req,res)=>{
    try{
        const users = await  Users.find({});
        res.status(200).send(users)    
    } catch(e) {
        res.status(500).send(error)
    }
})

router.get('/user/:id' ,async (req,res)=>{
    const _id = req.params.id
    try{
        const users = await Users.find({_id})
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch(e){
        res.status(500).send(error)
    }
})

router.patch('/user/:id' , async (req,res) => {

    const update = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : 'invalid updates'})
    }
    try{
        const user = await Users.findById(req.params.id);
        update.forEach((update)=> user[update] = req.body[update])
        await user.save()
        //const users = await Users.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true})
        if(!users){
            return res.status(404).send()
        }
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

router.delete('/user/:id' , async (req,res) => {
    try{
        const users = await Users.findByIdAndDelete(req.params.id)
        if(!users){
            return res.status(404).send()
        }
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})
 
module.exports = router
