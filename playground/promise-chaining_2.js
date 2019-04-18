require("../src/db/mongoose.js")
const Tasks = require("../src/models/task.js")

// Tasks.findByIdAndDelete('5cad94537e52f112340b8f37').then((result)=>{
//     console.log(result)
//     return Tasks.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })


const deleteTasksAndCount = async (id) =>{
    const deleteUser = await Tasks.findByIdAndDelete(id)
    const count = await Tasks.countDocuments({completed:false})
    return count
}

deleteTasksAndCount('5cad94537e52f112340b8f37').then((data)=>{
    console.log(data)
}).catch((e)=>{
    console.log(e)
})