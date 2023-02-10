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

// make a new blog
blogsRouter.post('/api/blogs', async (request, response, next) => {
  const body = request.body

// respond with bad request if title or url is missing

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

    const savedBlog = await blog.save()
    response.status(201).json.save(savedBlog)

})

// delete a blog
blogsRouter.delete('/api/blogs/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

// update a blog
blogsRouter.put('/api/blogs/:id', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      response.json(blog)
    
})


module.exports = blogsRouter
