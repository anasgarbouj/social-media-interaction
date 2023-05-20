const Post = require('../model/posts');

exports.createPost = async (req, res, next) => {
  const imageUrl = req.file ? req.file.path : null;
  const newPost = {
    ...req.body,
    imageUrl
  };
  
  const post = new Post(newPost);

  try {
    await post.save();
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ message: 'Posts fetched successfully', posts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
}
exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const result = await Post.deleteOne({ _id: postId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post', error });
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const updatedPostData = req.body;

  // If an image was uploaded, update the image URL
  if (req.file) {
    updatedPostData.imageUrl = req.file.path;
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Update the post with the new data
    post.set(updatedPostData);
    await post.save();

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post', error });
  }
};
// Add comment
exports.addComment = async (req, res, next) => {
  const postId = req.params.postId;
  const commentText = req.body.text; // Retrieve the comment text from the request body

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const newComment = {
      text: commentText, // Use the commentText variable to set the text property
      showOptions: false,
      editing: false
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};



exports.getComments = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const comments = post.comments;
    res.status(200).json({ message: 'Comments fetched successfully', comments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error });
  }
};


// Update comment
exports.updateComment = async (req, res, next) => {
  const postId = req.params.postId;
  const commentIndex = req.params.commentIndex;
  const updatedComment = req.body.comment;

  try {
    const post = await Post.findById(postId);
    if (!post || !post.comments[commentIndex]) {
      res.status(404).json({ message: 'Post or comment not found' });
      return;
    }

    post.comments[commentIndex] = updatedComment;
    await post.save();

    res.status(200).json({ message: 'Comment updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment', error });
  }
};

// Delete comment
exports.deleteComment = async (req, res, next) => {
  const postId = req.params.postId;
  const commentIndex = req.params.commentIndex;

  try {
    const post = await Post.findById(postId);
    if (!post || !post.comments[commentIndex]) {
      res.status(404).json({ message: 'Post or comment not found' });
      return;
    }

    post.comments.splice(commentIndex, 1);
    await post.save();

    res.status(200).json({ message: 'Comment deleted successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error });
  }
};
exports.likePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // increment the likesCount
    post.likesCount++;
    post.liked = true;
    await post.save();

    res.status(200).json({ message: 'Post liked successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to like post', error });
  }
};
exports.sharePost = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // increment the sharesCount
    post.sharesCount++;
    await post.save();

    res.status(200).json({ message: 'Post shared successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Failed to share post', error });
  }
};