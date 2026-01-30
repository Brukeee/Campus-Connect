import Post from '../models/Post.js';

export async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate('user_id', 'full_name email');
    return res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    console.error('Get posts error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getPostsByUser(req, res) {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ user_id: userId }).populate('user_id', 'full_name email');
    return res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    console.error('Get posts by user error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getMyPosts(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });
    const posts = await Post.find({ user_id: userId }).populate('user_id', 'full_name email');
    return res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    console.error('Get my posts error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id).populate('user_id', 'full_name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json({ success: true, data: post });
  } catch (err) {
    console.error('Get post error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function createPost(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'No token' });
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content is required' });
    const post = new Post({ user_id: userId, content });
    await post.save();
    return res.status(201).json({ success: true, data: post });
  } catch (err) {
    console.error('Create post error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function updatePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const uid = req.user?.id;
    const role = req.user?.role;
    const allowedRoles = ['admin', 'super_admin', 'university_admin'];
    if (!uid) return res.status(401).json({ message: 'No token' });
    if (String(post.user_id) !== String(uid) && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Update post error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function deletePost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const uid = req.user?.id;
    const role = req.user?.role;
    const allowedRoles = ['admin', 'super_admin', 'university_admin'];
    if (!uid) return res.status(401).json({ message: 'No token' });
    if (String(post.user_id) !== String(uid) && !allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: 'Post deleted' });
  } catch (err) {
    console.error('Delete post error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
