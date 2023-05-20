const express = require('express');
const postController = require('../controller/postsController');
const router = express.Router();

const upload = require('../upload');

  

router.post('/', upload.single('image'), postController.createPost);
router.get('/', postController.getPosts);
router.delete('/:id', postController.deletePost);
router.put('/:postId', upload.single('image'), postController.updatePost);
router.post('/:postId/comments', postController.addComment);
router.get('/:postId/comments', postController.getComments); 
router.put('/:postId/comments/:commentIndex', postController.updateComment);
router.delete('/:postId/comments/:commentIndex', postController.deleteComment);
router.put('/:postId/like', postController.likePost);
router.put('/:postId/share', postController.sharePost);



module.exports = router;