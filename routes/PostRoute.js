import express from 'express'
import { createPost, deletePost,savedPost,deleteRPost, getPost,getComment, createComment,getTimelinePosts, likePost, updatePost ,getAllPost,reportPost} from '../controllers/PostController.js'
import authMiddleWare from '../middleware/AuthMiddleware.js'
const router = express.Router()



router.post('/',authMiddleWare,createPost)
router.get('/:id', getPost)


router.put('/:id',authMiddleWare, updatePost)
router.delete('/:id/:uid', deletePost)


router.delete('/:id/:uid/report', deleteRPost)
router.post('/:id/:uid/save',savedPost)


router.put('/:id/:uid/report',reportPost)
router.put('/:id/like',authMiddleWare, likePost)


router.get('/:id/timeline', getTimelinePosts)
router.get('/',getAllPost)

router.post('/:id/comment',createComment)
router.get('/:id/comments',getComment)


export default router