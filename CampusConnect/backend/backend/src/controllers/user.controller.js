import User from "../models/user.js"
import bcrypt from "bcryptjs"

export async function getAll(req, res) {
	try {
		const users = await User.find().select('-password'); // Exclude password from response
		if (users.length === 0) {
			return res.json({ message: 'No users to display' });
		}
		res.status(200).json({
			success: true,
			count: users.length,
			data: users
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
}

export async function getUser(req, res) {
	try {
		const user = await User.findById(req.params.id).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({
			success: true,
			data: user
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
}

export async function createUser(req, res) {
	console.log('Create user req.body:', req.body);
	try {
		const { full_name, email, password, role, bio, linkedin, twitter, ...otherFields } = req.body;
		if (!full_name || !email || !password || !role) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({ full_name, email, password: hashedPassword, role, bio, linkedin, twitter, ...otherFields });
		await newUser.save();
		res.status(201).json({
			success: true,
			message: 'User created successfully',
			data: { ...newUser.toObject(), password: undefined }
		});
	} catch (error) {
		console.error('Create user error:', error.message);
		if (error.code === 11000) {
			return res.status(400).json({ message: 'Email already exists' });
		}
		if (error.name === 'ValidationError') {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({ message: 'Server error' });
	}
}

export async function updateUser(req, res) {
	console.log('Update user req.params.id:', req.params.id);
	console.log('Update user req.body:', req.body);
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		Object.assign(user, req.body);
		await user.save();
		const updatedUser = user.toObject();
		delete updatedUser.password;
		res.status(200).json({
			success: true,
			message: 'User updated successfully',
			data: updatedUser
		});
	} catch (error) {
		console.error('Update user error:', error.message);
		if (error.name === 'ValidationError') {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({ message: 'Server error' });
	}
}

export async function deleteUser(req, res) {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({
			success: true,
			message: 'User deleted successfully'
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
}
