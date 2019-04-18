const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,        
    },
    age : {
        type : Number,
        default : 0
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
                 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is not valid")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("passwors can not be password")
            }
        }
    }
})

userSchema.method.generateAuthToken = async function (){
    console.log("here")
    //  const user = this;
    //  console.log(this.db)
    //const token = jwt.sign({_id:user._id.toString()}, 'thisIsToken');
    //console.log(token)
    //return token
}

userSchema.statics.findByCredentials = async (email , password)=>{
    
    const user = await User.find({email})

    if(user.length == 0){
        throw new Error('unable to login')
    }

    const isValid = await bcrypt.compare(password , user[0].password);

    if(!isValid){
        throw new Error('unable to login')
    }
    return user
}

userSchema.pre('save' , async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password , 8)
    }
    next();
})

const User = mongoose.model('user' , userSchema);
User.ensureIndexes()

module.exports = User;