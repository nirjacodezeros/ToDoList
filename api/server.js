const express = require('express');
const app = express()
const mongoose = require("mongoose")

port = 3080;

var cors = require('cors')
const CrudRoutes = require('./routes/crudRoutes')
app.use(express.json())
app.use(cors())
app.use('/api',CrudRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const randomId = require('random-id');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let tasks = [
  {
    id: 1,
    task: 'task1',
    assignee: 'assignee1000',
    status: 'completed'
  },
  {
    id: 2,
    task: 'task2',
    assignee: 'assignee1001',
    status: 'completed'
  },
  {
    id: 3,
    task: 'task3',
    assignee: 'assignee1002',
    status: 'completed'
  },
  {
    id: 4,
    task: 'task4',
    assignee: 'assignee1000',
    status: 'completed'
  },
  
 ];
// app.get('/api/todos', (req, res) => {
//   console.log('api/todos called!!!!!')
//   res.json(tasks);
// });

// app.post('/api/todo', (req, res) => {
//    const task = req.body.task;
//    task.id = randomId(10);
//    tasks.push(task);
//    res.json(tasks);
// })


// app.delete('/api/todo/:id', (req, res) => {
//   console.log("Id to delete:::::", req.params.id)
//   tasks = tasks.filter(task => task.id != req.params.id);
//   res.json(tasks);
// })

// app.get('/api/todoId/:id', (req, res) => {
//   console.log("Id to get:::::", req.params.id)
//   tasks = tasks.filter(task => task.id == req.params.id);
//   res.json(tasks);
// })

// app.put('/api/todos/:id', (req, res) => {
//   console.log("Id to update:::::", req.params.id)
//   const taskToUpdate = req.body.task;
//   tasks = tasks.map(task => {
//     if (task.id == req.params.id) {
//       task = taskToUpdate;
//       task.id = parseInt(req.params.id);
//     }
//     return task;
// });
//   res.json(tasks);
// });


app.use(cors())

app.listen(port, () => {
    console.log(`Server listening on the port::::::${port}`);
});

mongoose.connect("mongodb://localhost:27017/LocalConnection", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})
