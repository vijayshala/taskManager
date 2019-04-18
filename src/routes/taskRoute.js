const express = require('express');
const router = new express.Router();
const Tasks = require("../models/task.js")


router.post('/task' , async (req,res)=>{
    const task = new Tasks(req.body)
    try{
        await task.save();
        res.status(201).send(user)    
    } catch(e){
        res.status(400).send(e)
    }
})

router.get('/task' ,async (req,res)=>{
    try{
        const tasks = await Tasks.find({});
        res.send(tasks)    
    } catch(e) {
        res.status(500).send(e)
    }    
})

router.get('/task/:id' , async (req,res)=>{
    const _id = req.params.id;
    const task = await Tasks.findById(_id);
    try{
        if(!task){
            return res.status(404).send(task)
         }
         res.send(task)
    } catch (e) {
        res.status(500).send(error)
    }
})


router.delete('/task/:id' , async (req,res) => {
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
})

router.patch('/task/:id' , async (req,res) => {
    
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error : 'invalid updates'})
    }
    try {
        const task = await Tasks.findById(req.params.id);
        update.forEach((update)=>task[update] = req.body[update]);
        task.save();
        //const task = await Tasks.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
})


module.exports = router