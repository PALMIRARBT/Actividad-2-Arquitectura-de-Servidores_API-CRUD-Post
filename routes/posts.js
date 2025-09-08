const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Crear Post
router.post('/', async (req, res) => {
  try {
    const { title, text, author } = req.body;
    const post = new Post({ title, text, author });
    await post.validate();
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar Posts
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Detalle Post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

// Modificar Post
router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar Post
router.delete('/:id', async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

module.exports = router;
