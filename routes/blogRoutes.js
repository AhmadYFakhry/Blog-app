const mongoose = require("mongoose");
const authenticate = require("@middleware/authenticate");
const cleanCache = require("@middleware/cleancache");

const Blog = mongoose.model("Blog");

module.exports = app => {
  app.get("/api/blogs/:id", authenticate, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id
    });
    res.send(blog);
  });

  app.get("/api/blogs", authenticate, async (req, res) => {
    const blogs = await Blog.find({
      _user: req.user.id
    }).cache({
      key: req.user.id
    });
    res.send(blogs);
  });

  app.post("/api/blogs", authenticate, cleanCache, async (req, res) => {
    const {
      title,
      content
    } = req.body;
    const blog = new Blog({
      title,
      content,
      _user: req.user.id
    });
    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
  });
};