import express from 'express'
import { createPost, deletePost,savedPost,deleteRPost, getPost, getTimelinePosts, likePost, updatePost ,getAllPost,reportPost} from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()

router.post('/',authMiddleWare,createPost)
router.get('/:id', getPost)
router.put('/:id',authMiddleWare, updatePost)
router.delete('/:id/:uid', deletePost)
router.get('/:id/:uid', deleteRPost)
router.post('/:id/:uid',savedPost)
router.put('/:id/:uid',reportPost)
router.put('/:id/like',authMiddleWare, likePost)
router.get('/:id/timeline', getTimelinePosts)
router.get('/',getAllPost)

export default router