const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


/* blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)})
}) */

// possibly change to '/'
// get all blogs
blogsRouter.get('/api/blogs', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})

// make a nwe blog
blogsRouter.post('/api/blogs', (request, response, next) => {
  const body = request.body

// respond with bad request if title or url is missing

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save()
    .then(savedBlog => {response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

// delete a blog
blogsRouter.app.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// update a blog
blogsRouter.app.put('/api/blogs/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
