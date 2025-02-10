const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/create', async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }
    const newPost = new Post({ title, body });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la publicación' });
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
});

router.get('/id/:_id', async (req, res) => {
  try {
    const post = await Post.findById(req.params._id);
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    const post = await Post.findOne({ title: req.params.title });
    if (!post) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la publicación' });
  }
});

router.put('/id/:_id', async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params._id,
      { title, body },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la publicación' });
  }
});

router.delete('/id/:_id', async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params._id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json({ message: 'Publicación eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la publicación' });
  }
});

router.get('/postsWithPagination', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Post.countDocuments();
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las publicaciones' });
  }
});

module.exports = router;
