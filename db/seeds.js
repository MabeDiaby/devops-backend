const Project = require('../models/project')
const ProjectSeed = require('./projectSeed.json')
const Task = require('../models/task')
const TaskSeed = require('./taskSeed.json')
const User = require('../models/user')
const UserSeed = require('./userSeed.json')

Project.deleteMany({})
  .then( () => Project.insertMany(ProjectSeed))
  .then( console.log )
  .catch( console.error )
 

  Task.deleteMany({})
  .then( () => Task.insertMany(TaskSeed))
  .then( console.log )
  .catch( console.error )
 

  User.deleteMany({})
  .then( () => User.insertMany(UserSeed))
  .then( console.log )
  .catch( console.error )
  .finally( () => { process.exit() })

