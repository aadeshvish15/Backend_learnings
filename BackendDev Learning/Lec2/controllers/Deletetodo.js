const Todo = require('../models/todo');

exports.Deletetodo = async (req, res) => {
    try {
        //extract todo item by id
        const id = req.params.id;
        const todo = await Todo.find({ _id: id })
        
        await Todo.findByIdAndDelete(id);
        res.json({
            success: true,
            message: "Todo Deleted",
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