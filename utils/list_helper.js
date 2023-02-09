const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {

  let listOfLikes = blogs.map(a => a.likes)

  const initialValue = 0
  const sumWithInitial = listOfLikes.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue
  )

  return sumWithInitial
}



const favoriteBlog = (blogs) => {

  let blogWithMostLikes = 0

  if (blogs.length === 0) {
    return undefined
  }

  blogs.forEach((element, index, array) => {
    if (blogs[index].likes > blogs[blogWithMostLikes].likes) {
      blogWithMostLikes = index
    }
  })

  return blogs[blogWithMostLikes]

}



const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return undefined
  }

  let dictOfBlogsPerAuthor = {}

  blogs.forEach((element, index, array) => {
    let currentAuthor = element.author
    if (currentAuthor in dictOfBlogsPerAuthor) {
      dictOfBlogsPerAuthor[currentAuthor]++
    }
    else {
      dictOfBlogsPerAuthor[currentAuthor] = 1
    }
  })

  var AuthorWithMostBlogs = blogs[1].author

  Object.keys(dictOfBlogsPerAuthor).forEach(function (key) {
    console.log(key)
    console.log(dictOfBlogsPerAuthor[key], key)

    if (dictOfBlogsPerAuthor[key] >= dictOfBlogsPerAuthor[AuthorWithMostBlogs]) {
      AuthorWithMostBlogs = key
      console.log(AuthorWithMostBlogs)
    }
  })

  console.log(AuthorWithMostBlogs)

  let ObjAuthorBlogs = {
    'author': AuthorWithMostBlogs,
    'blogs': dictOfBlogsPerAuthor[AuthorWithMostBlogs]
  }


  return ObjAuthorBlogs

}

/* const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return undefined
  }

  // iterate over list of blogs to gather all authors in a dict and their likes
  let dictOfAuthors = {}
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].author in dictOfAuthors) {
      dictOfAuthors[blogs[i].author] += blogs[i].likes
    }
    else {
      dictOfAuthors[blogs[i].author] = blogs[i].likes
    }
  }

  // iterate over dictOfAuthors of blogs and check which author has the most likes
  let authorWithMostLikes = 0

  Object.keys(dictOfAuthors).forEach(function(key) {
    if (dictOfAuthors.key > authorWithMostLikes) {
      authorWithMostLikes = key
    }
    console.log(key + ' ' + dictOfAuthors[key])
  })

  let objMostLikes = {
    'author': authorWithMostLikes,
    'likes': dictOfAuthors[authorWithMostLikes]
  }

  return objMostLikes

} */

const mostLikes = (blogs) => {

  if (blogs.length === 0) {
    return undefined
  }

  // iterate over list of blogs to gather all authors in a dict and their likes
  let dictOfAuthors = {}
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].author in dictOfAuthors) {
      dictOfAuthors[blogs[i].author] += blogs[i].likes
    }
    else {
      dictOfAuthors[blogs[i].author] = blogs[i].likes
    }
  }

  // iterate over dictOfAuthors of blogs and check which author has the most likes
  let authorWithMostLikes = 0

  Object.keys(dictOfAuthors).forEach(function(key) {
    if (authorWithMostLikes === 0) {
      authorWithMostLikes = key}
    if (dictOfAuthors[key] >= dictOfAuthors[authorWithMostLikes]) {
      authorWithMostLikes = key
    }
  })

  let objMostLikes = {
    'author': authorWithMostLikes,
    'likes': dictOfAuthors[authorWithMostLikes]
  }

  return objMostLikes

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

