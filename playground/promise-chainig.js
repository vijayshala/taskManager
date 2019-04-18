require("../src/db/mongoose.js")
const Users = require("../src/models/user.js")

// Users.findByIdAndUpdate('5cac63dfc3fa312b18261b3f' , {age:1}).then((result)=>{
//     console.log(result)
//     return Users.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })


const updateUserAndCount = async (id , age) => {
    const updateUser = await Users.findByIdAndUpdate(id , {'age' : age})
    const count = await Users.countDocuments({'age' : age})
    return count
}

updateUserAndCount('5cac63dfc3fa312b18261b3f' , 2).then((data)=>{
    console.log(data)
}).catch((e)=>{
    console.log("error == >>>> " , e)
})