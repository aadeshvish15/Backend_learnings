//import model
const Todo = require('../models/todo');

//Route handler
//Kabhi bhi main thread pe network call nahi karna kyuki agr kiya toh code excution slow/interrupt hojayega
exports.createToDo = async (req, res) => {
    try {
        //extract title and description from req body
        const { title, description } = req.body;
        //create new todo obj and inserted in DB
        const response = await Todo.create({ title, description });
        //send a json res with success flag
        res.status(200).json(
            {
                success: true,
                data: response,
                message: 'Entry created successfully'
            }
        )
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500)
            .json({
                success: false,
                data: 'internal server error',
                message:err.message,
        })
    }
}