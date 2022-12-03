import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    fullname:{type:String,required:true},
    desc: {type: String, required : true},
    isReport: {
      type: Boolean,
      default: false,
    },
    likes: [],
    Comment:[],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    image: {type:String},
    
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
