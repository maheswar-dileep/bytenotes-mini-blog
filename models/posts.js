import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: String,
    required: [true, 'Post text is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const Post = models.Post || new model('Post', PostSchema);

export default Post;
