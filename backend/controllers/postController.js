const AwarenessPost = require('../models/AwarenessPost');

// @desc    Create new post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = async (req, res) => {
  try {
    const { title, content, category, imageUrl } = req.body;

    const post = await AwarenessPost.create({
      title,
      content,
      category: category || 'Awareness',
      imageUrl: imageUrl || '',
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await AwarenessPost.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = async (req, res) => {
  try {
    const post = await AwarenessPost.findById(req.params.id);

    if (post) {
      await AwarenessPost.findByIdAndDelete(req.params.id);
      res.json({ message: 'Post removed' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
};
