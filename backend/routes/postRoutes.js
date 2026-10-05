const express = require('express');
const router = express.Router();
const {
  createPost,
  getPosts,
  deletePost,
} = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createPost)
  .get(getPosts);

router.route('/:id')
  .delete(protect, deletePost);

module.exports = router;
