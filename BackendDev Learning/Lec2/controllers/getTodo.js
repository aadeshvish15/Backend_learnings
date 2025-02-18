//import model
const Todo = require('../models/todo');

//Route handler
//Kabhi bhi main thread pe network call nahi karna kyuki agr kiya toh code excution slow/interrupt hojayega
exports.getTodo = async (req, res) => {
    try {
        //fetch all todo from DB
        const todos = await Todo.find({});
        res.status(200).json({
            success: true,
            data: todos,
            message: "Entire todos is fetched"
        });
    }
    catch (err) {
        console.error(err);
        // console.log(err);
        res.status(500)
        .json({
            success: false,
            message: 'internal server error fetched',
            error:err.message,
    })
    }
}


//Get data by ID from DB
exports.getTodoById = async (req, res) => {
    try {
        //extract todo item by id
        const id = req.params.id;
        const todo = await Todo.find({ _id: id })
        
        //given id not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "No Data found for given id",  
            })
        }
        //data for given id found
        res.status(200).json({
            success: true,
            data: todo,
            message:`Todo data for ${id} is successfully fetched`
        })
    }
    catch (err) {
        console.error(err);
        // console.log(err);
        res.status(500)
        .json({
            success: false,
            message: 'internal server error fetched',
            error:err.message,
    })
    }
}