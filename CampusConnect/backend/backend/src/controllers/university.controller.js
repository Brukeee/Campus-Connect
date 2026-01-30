import University from "../models/University.js";

export async function getAll(req, res) {
	try {
		const universities = await University.find();
		if (universities.length === 0) {
			return res.json({ message: 'No university to display' });
		}
		res.status(200).json({
			success: true,
			count: universities.length,
			data: universities
		})

	} catch (error) {
		res.status(500).json({msg:"Server Error"})
	}
}

export async function createNew(req,res) {
	try {
		const {name, code} = req.body;
		if(!name || !code){
			return res.status(400).json({suggestion:"Enter University name and code"});
		}

		const newUniversity = new University({ name, code });
		await newUniversity.save();

		res.status(201).json({
			success: true,
			message: "New University created",
			data: newUniversity
		});

	} catch (error) {
		console.error('Create university error:', error.message);
		if (error.code === 11000) {
			return res.status(400).json({ message: 'University code already exists' });
		}
		if (error.name === 'ValidationError') {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({msg:"Server Error"})
	}
}

export async function getOne(req, res) {
	try {
		const university = await University.findById(req.params.id);
		if (!university) {
			return res.status(404).json({ message: 'University not found' });
		}
		res.status(200).json({
			success: true,
			data: university
		});
	} catch (error) {
		res.status(500).json({ msg: "Server Error" });
	}
}

export async function update(req, res) {
	try {
		const { name, code } = req.body;
		if (!name || !code) {
			return res.status(400).json({ suggestion: "Enter University name and code" });
		}
		const updatedUniversity = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
		if (!updatedUniversity) {
			return res.status(404).json({ msg: "University not found" });
		}
		res.status(200).json({
			success: true,
			message: "University updated successfully",
			data: updatedUniversity
		});
	} catch (error) {
		console.error('Update university error:', error.message);
		if (error.code === 11000) {
			return res.status(400).json({ message: 'University code already exists' });
		}
		if (error.name === 'ValidationError') {
			return res.status(400).json({ message: error.message });
		}
		res.status(500).json({ msg: "Server Error" });
	}
}

export async function deleteOne(req, res) {
	try {
		const deletedUniversity = await University.findByIdAndDelete(req.params.id);
		if (!deletedUniversity) {
			return res.status(404).json({ msg: "University not found" });
		}
		res.status(200).json({
			success: true,
			message: "University deleted successfully"
		});
	} catch (error) {
		res.status(500).json({ msg: "Server Error" });
	}
}