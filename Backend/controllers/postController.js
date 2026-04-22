const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require('path');
const fs = require('fs');

exports.createPost = async (req, res) => {
  try {
    const { title, description, ingredients } = req.body;
    const imageUrl = req.file?.filename;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Authentication required to create a post." });
    }

    if (!title || !description || !ingredients) {
      return res.status(400).json({ message: "Please provide all required fields (title, description, ingredients)." });
    }

    const newPost = await Post.create({
      title,
      description,
      ingredients,
      imageUrl,
      user: req.user.id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error("Create Post Error:", err);
    res.status(500).json({ message: "Failed to create post", error: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { username } = req.query;
    let query = {};
    if (username) {
      const user = await User.findOne({ name: username });
      if (!user) {
        return res.status(200).json({ posts: [], message: `No user found with username: ${username}` });
      }
      query.user = user._id;
    }

    const posts = await Post.find(query)
      .populate('user', 'name')
      .populate('likes', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    res.status(500).json({ message: "Failed to fetch posts", error: err.message });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .populate('user', 'name')
      .populate('likes', 'name')
      .sort({ date: -1 });
    res.json({ posts });

  } catch (err) {
    console.error("Server Error in getMyPosts:", err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      console.error("Mongoose CastError/ObjectId error in getMyPosts. Invalid ID format:", err.message);
      return res.status(404).json({ message: 'No recipes found for this user, or invalid user ID provided.' });
    }
    res.status(500).send('Server Error');
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, description, ingredients } = req.body;
    const updatedFields = { title, description, ingredients };

    let oldImageUrl;

    if (req.file?.filename) {
      updatedFields.imageUrl = req.file.filename;

      const oldPost = await Post.findById(req.params.id);
      if (oldPost && oldPost.imageUrl) {
        oldImageUrl = oldPost.imageUrl;
      }
    }

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updatedFields,
      { new: true }
    ).populate('user', 'name')
     .populate('likes', 'name');

    if (!post) {
      return res.status(404).json({ message: "Post not found or unauthorized to update" });
    }

    if (oldImageUrl && oldImageUrl !== updatedFields.imageUrl) {
      const imagePath = path.join(__dirname, '..', 'uploads', oldImageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting old image file:", err);
      });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error("Update Post Error:", err);
    res.status(500).json({ message: "Failed to update post", error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const result = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!result) {
      return res.status(404).json({ message: "Post not found or unauthorized to delete" });
    }

    if (result.imageUrl) {
      const imagePath = path.join(__dirname, '..', 'uploads', result.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image file:", err);
      });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete Post Error:", err);
    res.status(500).json({ message: "Failed to delete post", error: err.message });
  }
};
exports.toggleLike = async (req, res) => {

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Authentication required to like or unlike a post." });
    }

    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const hasLiked = post.likes.includes(userId);

    let updateOperation;
    let successMessage;

    if (hasLiked) {
      updateOperation = { $pull: { likes: userId } };
      successMessage = 'Post unliked successfully';
    } else {
      updateOperation = { $addToSet: { likes: userId } };
      successMessage = 'Post liked successfully';
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      updateOperation,
      { new: true }
    )
    .populate('user', 'name') 
    .populate('likes', 'name')
    if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found after update attempt.' });
    }

    res.json({ message: successMessage, post: updatedPost });

  } catch (err) {
    console.error("Toggle Like Error:", err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found with provided ID' });
    }
    res.status(500).send('Server Error');
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'name')
      .populate('likes', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error("Get Post By ID Error:", err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found with provided ID' });
    }
    res.status(500).send('Server Error');
  }
};
exports.savePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await Post.findById(postId);
        const user = await User.findById(userId);
        if (!post || !user) {
            return res.status(404).json({ message: 'Post or User not found' });
        }
        if (!post.savedBy.includes(userId)) {
            post.savedBy.push(userId);
            await post.save();
        }

        if (!user.savedPosts.includes(postId)) {
            user.savedPosts.push(postId);
            await user.save();
        }

        const updatedPost = await Post.findById(postId).populate('user', 'name');

        res.status(200).json({ message: 'Post saved successfully', post: updatedPost });

    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).json({ message: 'Server error saving post' });
    }
};
exports.unsavePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id; 
        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        if (!post || !user) {
            return res.status(404).json({ message: 'Post or User not found' });
        }

        post.savedBy = post.savedBy.filter(id => id.toString() !== userId.toString());
        await post.save();

        user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId.toString());
        await user.save();

        const updatedPost = await Post.findById(postId).populate('user', 'name');


        res.status(200).json({ message: 'Post unsaved successfully', post: updatedPost });

    } catch (error) {
        console.error('Error unsaving post:', error);
        res.status(500).json({ message: 'Server error unsaving post' });
    }
};
exports.toggleUnsave = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; 
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (!post.savedBy.includes(userId)) {
      return res.status(400).json({ message: 'Recipe not saved' });
    }

    post.savedBy = post.savedBy.filter(id => id.toString() !== userId.toString()); 
    await post.save();
    const updatedPost = await Post.findById(postId).populate('user', 'name');

    res.json({ message: 'Recipe unsaved successfully', post: updatedPost });
  } catch (error) {
    console.error('Error unsaving post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.toggleSave = async (req, res) => {
  try {
    console.log('Attempting to save post...');
    const postId = req.params.id;
    const userId = req.user.id;
    console.log('Post ID:', postId, 'User ID:', userId);

    const post = await Post.findById(postId);
    if (!post) {
      console.error('Recipe not found for ID:', postId);
      return res.status(404).json({ message: 'Recipe not found' });
    }
    console.log('Post found:', post.title);
    console.log('Current savedBy array:', post.savedBy);

    if (post.savedBy.includes(userId)) {
      console.log('Recipe already saved by this user.');
      return res.status(400).json({ message: 'Recipe already saved' });
    }
    post.savedBy.push(userId);
    await post.save();
    console.log('Post saved successfully. New savedBy:', post.savedBy);

    const updatedPost = await Post.findById(postId).populate('user', 'name');
    res.json({ message: 'Recipe saved successfully', post: updatedPost });
  } catch (error) {
    console.error('Error in toggleSave:', error); 
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getSavedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const savedPosts = await Post.find({ savedBy: userId }).populate('user', 'name').sort({ createdAt: -1 });
    res.status(200).json(savedPosts);
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    res.status(500).json({ message: 'Server error: Could not retrieve saved recipes.' });
  }
};

exports.getLikedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const likedPosts = await Post.find({ likes: userId }).populate('user', 'name').sort({ createdAt: -1 });
    res.status(200).json(likedPosts);
  } catch (error) {
    console.error('Error fetching liked posts:', error);
    res.status(500).json({ message: 'Server error: Could not retrieve liked recipes.' });
  }
};