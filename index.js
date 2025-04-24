import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Oppenheimer: A Cinematic Exploration of Power and Consequence",
    content:
      "Christopher Nolan’s 'Oppenheimer' dives deep into the psyche of J. Robert Oppenheimer, the physicist who led the development of the atomic bomb. With Cillian Murphy delivering a hauntingly powerful performance, the film blends historical narrative with psychological drama, challenging viewers to reflect on morality, responsibility, and the cost of innovation. Visually stunning and emotionally resonant, 'Oppenheimer' is not just a biopic—it's a meditation on the weight of genius and guilt.",
    author: "Jessica Reed",
    date: "2025-04-24T10:00:00Z",
  },
  {
    id: 2,
    title: "Dune: Part Two – Epic Storytelling on a Galactic Scale",
    content:
      "Denis Villeneuve's 'Dune: Part Two' continues the saga of Paul Atreides as he embraces his destiny on the desert planet of Arrakis. With breathtaking visuals, immersive world-building, and a stellar ensemble cast, the sequel elevates the stakes while remaining faithful to Frank Herbert’s iconic sci-fi vision. It's a thrilling ride through prophecy, politics, and rebellion that cements 'Dune' as a monumental achievement in modern science fiction cinema.",
    author: "Liam Carter",
    date: "2025-04-24T11:15:00Z",
  },
  {
    id: 3,
    title: "Barbie: A Whimsical Journey Through Identity and Imagination",
    content:
      "Greta Gerwig’s 'Barbie' breaks all expectations with a clever, satirical take on the iconic doll’s world. Starring Margot Robbie and Ryan Gosling, the film blends humor, existential musings, and social commentary, wrapped in a vibrant, pink aesthetic. It's both a celebration and critique of femininity, capitalism, and childhood nostalgia—making it one of the most surprisingly profound films of the year.",
    author: "Emily Novak",
    date: "2025-04-24T12:30:00Z",
  },
];


let lastId = 3;

function getCurrentDateISO() {
  const currentDate = new Date();
  return currentDate.toISOString();
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//GET All posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});
//GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundId = posts.find((post) => post.id === id);
  if(!foundId) return res.status(404).json({ message: "Post not found" });
  res.json(foundId);
});

//View single post
app.get("/view/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundId = posts.find((post) => post.id === id);
  if(!foundId) return res.status(404).json({ message: "Post not found" });
  res.json(foundId);
});

//POST a new post
app.post("/posts", (req, res) => {
  const newPost = 
  {
    id: posts.length+1,
    title: req.body["title"], 
    content: req.body["content"],
    author: req.body["author"],
    date: getCurrentDateISO(),
  };
  posts.push(newPost);
  console.log("We added a new Post: " + JSON.stringify(newPost));
  res.json(newPost);
  
});
//PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingPost = posts.find((post)=> post.id === id);
  const changedPost = 
  {
    id: id,
    title: req.body["title"] || existingPost.title, 
    content: req.body["content"] || existingPost.content, 
    author: req.body["author"] || existingPost.author,
    date: getCurrentDateISO(),
  };
  const searchIndex = posts.findIndex((post) => post.id === id);
  posts[searchIndex] = changedPost;
  res.json(changedPost);
});
//DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);
  if (searchIndex > -1) {
    posts.splice(searchIndex, 1);
    res.json(posts);
  } else {
    res
      .status(404)
      .json({ error: `Post with id: ${id} not found. No posts were deleted.` });
  }
});
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
