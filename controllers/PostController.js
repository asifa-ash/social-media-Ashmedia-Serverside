import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import mongoose from "mongoose";

// creating a post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    const data = await newPost.save();
    res.status(200).json("success");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// getAllpost
export const getAllPost = async (req, res) => {
  try {
    const posts = await PostModel.find();

    console.log(posts);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;

  // const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);

    let userId = req.params.uid;

    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete Reported post
export const deleteRPost = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.uid;
  console.log(userId, "Hell", req.params);

  // const { userId } = req.body;
  const admin = await UserModel.findById(userId);
  if (admin.isAdmin === true) {
    try {
      const post = await PostModel.findById(id);
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Action forbidden");
  }
};

// savedPost
export const savedPost = async (req, res) => {
  const postid = req.params.id;
  const userId = req.params.uid;
  const user = await UserModel.findById(userId);

  if (user.saved.includes(postid)) {
    await user.updateOne({ $pull: { saved: postid } });
    res.status(200).json("Post removed");
  } else {
    await user.updateOne({ $push: { saved: postid } });
    res.status(200).json("Post saved");
  }
};

// report post

export const reportPost = async (req, res) => {
  const postId = req.params.id;
  console.log(postId, "kkkkkkkkkk");

  const userId = req.params.uid;

  console.log(req.body, "hhhhhhhhhh");

  const post = await PostModel.findById(postId);
  console.log(post, "nnnnnnnnnnnnnnnn");
  if (post) {
    try {
      const post = await PostModel.findByIdAndUpdate(postId, req.body, {
        new: true,
      });
      console.log(post, "kiteeeeeeeeeeeeeeeeeeeeeeee");
    } catch (err) {
      console.log(err);
    }
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// create comments
export const createComment = async (req, res) => {
  const id = req.params.id;

  const msg = req.body;
  console.log(msg, "kkkkkkkkkkkkkk");
  const post = await PostModel.findById(id);
  console.log(post);
  if (post) {
    await post.updateOne({ $push: { Comment: msg } });
  }
};

// get comments
export const getComment = async (req, res) => {
  const id = req.params.id;

  const post = await PostModel.findById(id)
  
  res.status(200).json(post);
  console.log(post, "ooooooooo");
};

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
