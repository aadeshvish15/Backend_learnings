const express = require('express');
const router = express.Router();

//import controller
const { createToDo } = require('../controllers/createToDo');
const { getTodo, getTodoById } = require('../controllers/getTodo');
const { Updatetodo } = require('../controllers/Updatetodo');
const { Deletetodo } = require('../controllers/Deletetodo');

// const { getToDo } = require('../controllers/getTodo');
//define API routes

router.post('/createToDo', createToDo);
router.get('/getTodos', getTodo);
router.get('/getTodos/:id', getTodoById)
router.put('/Updatetodo/:id', Updatetodo)
router.delete('/Deletetodo/:id', Deletetodo)

// router.get('/getToDos', getToDo);
//export
module.exports = router;