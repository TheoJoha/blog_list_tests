const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }
  ]

beforeEach(async () => {
await Blog.deleteMany({})
let blogObject = new Blog(initialBlogs[0])
await blogObject.save()
blogObject = new Blog(initialBlogs[1])
await blogObject.save()
blogObject = new Blog(initialBlogs[2])
await blogObject.save()
blogObject = new Blog(initialBlogs[3])
await blogObject.save()
blogObject = new Blog(initialBlogs[4])
await blogObject.save()
blogObject = new Blog(initialBlogs[5])
await blogObject.save()
})

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
    
      expect(response.body).toHaveLength(initialBlogs.length) // set comparison-length equal to length of body.
    })
})

// unique identifier property of the blog posts is named id
describe('unique identifier property of the blog posts is named id', () => {
    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
       
        expect(JSON.stringify(response[0].body._id)).toBeDefined()
      })
})


// test if a valid blog can be added
describe('test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post', () => {
    test('a valid note can be added', async () => {
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
        
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain(
            'Best blog'
        )
        })
})


// blog without title is not added
test('note without like-property will default to 0 likes', async () => {
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
  })

  // delete a blog
  describe('test deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.notesInDb()
  
      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)

    })
  })

  // test update blog
  test('test if update is ok', async () => {
    const newBlog = {
        title: body.initialBlogs[0].title,
        author: body.body.initialBlogs[0].author,
        url: body.body.initialBlogs[0].url,
        likes: body.body.initialBlogs[0].likes
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

  })


// close connection
  afterAll(async () => {
    await mongoose.connection.close()
  })



