const mongoose = require ('mongoose')

// fix connection.js for server use front and backend.

const mongoURI = process.env.NODE_ENV === 'production'
  ?process.env.DB_URL
  // :'mongodb://localhost/devops'
  :'http://localhost/devops'

mongoose.connect(mongoURI)
  .then(instance =>
    console.log("I'm connected to the DevOps DB: "+ instance.connections[0].name))
  .catch(err => console.log("Connection to DevOps DB failed: ", err))

  module.exports = mongoose