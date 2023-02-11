const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
/* newTimeout = 100000
jest.setTimeout(newTimeout) */
// jest.useFakeTimers()




/* beforeAll(async () => {
mongoose
.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));
}) */


beforeEach(async () => {

  await Blog.deleteMany({})
  console.log('cleared')

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 100000)



describe ('returns correct resources in the JSON format', () => {
  // test that blogs are returned as JSON
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)
  
  // test length of blogs
  test('test length of blogs', async () => {
      const response = await api.get('/api/blogs')
    
      expect(response.body).toHaveLength(helper.initialBlogs.length) // set comparison-length equal to length of body.
    }, 100000)
})

// unique identifier property of the blog posts is named id
/* describe('unique identifier property of the blog posts is named id', () => {
    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
       
        expect(JSON.stringify(response[0].body._id)).toBeDefined()
      }, 100000)
}) */


// test if a valid blog can be added
/* describe('test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Best blog",
            author: "Best Blogger",
            url: "...",
            likes: 0,
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        
        const titles = response.body.map(r => r.title)
        
        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain(
            'Best blog'
        )
        }, 100000)
}) */


// blog without title is not added
/* test('blog without like-property will default to 0 likes', async () => {
    const newBlog = {
        title: "Best blog",
        author: "Best Blogger",
        url: "...",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body.likes).toBe(0)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000) */

  // delete a blog
/*   describe('test deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)

    }, 100000)
  }) */

  // test update blog
/*   test('test if update is ok', async () => {
    const newBlog = {
        title: body.helper.initialBlogs[0].title,
        author: body.helper.initialBlogs[0].author,
        url: body.helper.initialBlogs[0].url,
        likes: body.helper.initialBlogs[0].likes
    }

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(400)

    const response = await api.get('/api/blogs')
  
    expect(response.body.title).toBe(newBlog.title)
    expect(response.body.author).toBe(newBlog.author)
    expect(response.body.url).toBe(newBlog.url)
    expect(response.body.likes).toBe(newBlog.likes)

  }, 100000) */


// close connection
  afterAll(async () => {
    await mongoose.connection.close()
  })



