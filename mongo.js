const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost/bloglist'

mongoose.set('strictQuery',false)
mongoose.connect(mongoUrl)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)


