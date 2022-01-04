const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  quote: {type: String},
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  admin: {type: Boolean, default:false},
  photo: String
  // quote: String
}, {collection: 'user-data'})

const User = mongoose.model('User', UserSchema)

module.exports = User