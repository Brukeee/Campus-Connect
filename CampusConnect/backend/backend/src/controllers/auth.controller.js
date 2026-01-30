// src/controllers/auth.controller.js
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import { signToken } from "../utils/jwt.js";

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const user = await User.findOne({ email }).lean();
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const stored = user.password || '';
    const matched = await bcrypt.compare(password, stored).catch(() => false);

    // If password stored unhashed (seed), allow direct match and re-hash
    let needRehash = false;
    if (!matched) {
      if (stored === password) {
        needRehash = true;
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    if (needRehash) {
      const hash = bcrypt.hashSync(password, 10);
      // update stored password asynchronously (best-effort)
      User.updateOne({ _id: user._id }, { $set: { password: hash } }).catch(() => {});
    }

    const token = signToken({ id: user._id, role: user.role, email: user.email });

    // return a minimal user object (avoid sending password)
    const safeUser = {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
    };

    return res.json({ token, user: safeUser });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// optional register placeholder
export async function register(req, res) {
  try {
    const { full_name, email, password, role, student_id, batch } = req.body;

    // Basic validation
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({ message: 'Full name, email, password, and role are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      full_name,
      email,
      password: hashedPassword,
      role,
      student_id,
      batch,
      status: 'pending' // Assuming new users need approval
    });

    await newUser.save();

    // Generate token
    const token = signToken({ id: newUser._id, email: newUser.email, role: newUser.role });

    // Return user without password
    const safeUser = {
      _id: newUser._id,
      full_name: newUser.full_name,
      email: newUser.email,
      role: newUser.role,
      student_id: newUser.student_id,
      batch: newUser.batch,
      status: newUser.status
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: safeUser
    });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ message: 'Server error' });
  }
};
