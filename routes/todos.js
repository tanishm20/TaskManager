const { Router } = require('express')
const { Todos } = require('../db')
const { Todonotes } = require('../dbnotes')
const Op = require('sequelize')
const PORT = process.env.PORT ||6534
const route = Router()

route.get('/', async (req, res) => {
  const todos = await Todos.findAll()
  res.send(todos)
})

route.get('/:id', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer',
    })
  }
  
  const todo = await Todos.findByPk(req.params.id)

  if (!todo) {
    return res.status(404).send({
      error: 'No todo found with id = ' + req.params.id,
    })
  }
  res.send(todo)
})

route.get('/:id/notes', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer',
    })
  }
  const todo = await Todonotes.findAll({
    where :{ taskId : req.params.id },
  })

  if (!todo) {
    return res.status(404).send({
      error: 'No todo found with id = ' + req.params.id,
    })
  }
  res.send(todo)
})



route.post('/', async (req, res) => {
  if (typeof req.body.title !== 'string') {
    return res.status(400).send({ error: 'Task name not provided' })
  }

  if(req.body.title.length===0){
   return res.status(400).send( 'Task name not provided' )
  }
  if (req.body.status === 'true') {
    req.body.status = true
  } else {
    req.body.status = false
  }
  var today = new Date();
  var date  = new Date(req.body.due);

  if(today>=date | isNaN(date.getTime()) ){
    date = today.setDate(today.getDate() + 1);
  }

  if(req.body.priority===""){
    req.body.priority="medium"
  }
  var stats = 'incomplete'
  await Todos.create({
      title: req.body.title,
      description: req.body.description,
      due: date,
      status: stats,
      priority: req.body.priority,
  })
  res.redirect("/")
})

route.post('/:id/notes', async (req, res) => {
  const newNote = await Todonotes.create({
      taskId: req.params.id,
      notes: req.body.notes,
  })

  res.redirect("https://task-manager-tanishm20.herokuapp.com/")
})

route.post('/:id', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'todo id must be an integer',
    })
  }
  const todo = await Todos.findByPk(req.params.id)
  
  if(req.body.due){
    var today = new Date();
  var date  = new Date(req.body.due);
  if(today>=date){
    date = today.setDate(today.getDate() + 1);
  }
  await todo.update({
      due: date})}

  if(req.body.status){
    await todo.update({
      status: "complete"})}
  
  if(!req.body.status){
    await todo.update({
       status: "incomplete"})}

  if(req.body.priority!=""){
    await todo.update({
      priority: req.body.priority})}
  res.redirect("https://task-manager-tanishm20.herokuapp.com/")
})

module.exports = route
