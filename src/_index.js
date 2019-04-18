const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = new express.Router()
require("./db/mongoose.js")
const Users = require("./models/user.js")
const Tasks = require("./models/task.js")

const app = express();
const port = process.env.PORT || 3030

app.use(express.json());
app.use(router)

router.get('/test' , (req ,res) =>{
    res.send('success test')
})

// app.post('/user' , (req,res)=>{
//     const user = new Users(req.body)
//     user.save().then((data)=>{
//         res.status(201).send(data)
//     }).catch((error)=>{
//         res.status(400).send(error)
//         res.send(error)
//     })
// })

app.post('/user' ,async (req,res)=>{
    const user = new Users(req.body);
    try{
        await user.save();
        res.status(201).send(user)
    } catch (e){
        res.status(400).send(e)
    }
})

app.post('/task' , async (req,res)=>{
    const user = new Tasks(req.body)
    try{
        await user.save();
        res.status(201).send(user)    
    } catch(e){
        res.status(400).send(error)
    }
})

app.get('/user' , async (req,res)=>{
    try{
        const users = await  Users.find({});
        res.status(200).send(users)    
    } catch(e) {
        res.status(500).send(error)
    }
})

app.get('/user/:id' ,async (req,res)=>{
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

app.get('/task' ,async (req,res)=>{
    try{
        const tasks = await Tasks.find({});
        res.send(tasks)    
    } catch(e) {
        res.status(500).send(e)
    }    
})

app.get('/task/:id' , async (req,res)=>{
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

// app.patch('/user/:id' ,async (req,res)=>{
//     try{
//         const users = await Users.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true})
//         if(!users){
//             return res.status(404).send()
//         }
//         res.send(users)
//     } catch(e){
//         res.status(500).send(e)
//     }
// })

app.patch('/user/:id' , async (req,res) => {

    const update = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'email', 'password'];
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error : 'invalid updates'})
    }
    try{
        const users = await Users.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true})
        if(!users){
            return res.status(404).send()
        }
        res.send(users)
    } catch(e){
        res.status(500).send(e)
    }
})

app.delete('/user/:id' , async (req,res) => {
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

app.delete('/task/:id' , async (req,res) => {
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

app.patch('/task/:id' , async (req,res) => {
    
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({error : 'invalid updates'})
    }
    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id , req.body , {new:true , runValidators:true})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e){
        res.status(500).send(e)
    }
})

myFunction = async ()=>{
    const hashedPassword = await bcrypt.hash('keshav@123' , 8); //(8 is number of rounds of hashing)it is called as salt parameter.
    const validPassword = await bcrypt.compare('keshav@123rr' , hashedPassword);
    console.log(validPassword)
}

myFunction()

jwtFunction = async () => {
    const token = await jwt.sign({_id:'kesh@123'} , "signature" , {expiresIn:'1 week'})
    console.log(token)
    const isValid = jwt.verify(token , "signature")
    console.log(isValid)
}

//jwtFunction()

 
app.listen(port , ()=>{
    console.log("server is running on port "+ port)
})