import Report from '../models/Report.js';

export async function createReport(req, res) {
  try {
    const reporter_id = req.user?.id || req.body.reporter_id;
    const { reported_id, type, reason } = req.body;
    if (!reported_id || !type || !reason) return res.status(400).json({ message: 'reported_id, type and reason required' });
    const r = new Report({ reporter_id, reported_id, type, reason });
    await r.save();
    return res.status(201).json({ success: true, data: r });
  } catch (err) {
    console.error('Create report error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getAllReports(req, res) {
  try {
    const role = req.user?.role;
    const allowed = ['admin', 'super_admin', 'university_admin'];
    if (!allowed.includes(role)) return res.status(403).json({ message: 'Forbidden' });

    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.status) filter.status = req.query.status;
    const list = await Report.find(filter).sort({ timestamp: -1 });
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (err) {
    console.error('Get reports error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function getReport(req, res) {
  try {
    const role = req.user?.role;
    const allowed = ['admin', 'super_admin', 'university_admin'];
    if (!allowed.includes(role)) return res.status(403).json({ message: 'Forbidden' });

    const rep = await Report.findById(req.params.id);
    if (!rep) return res.status(404).json({ message: 'Report not found' });
    return res.status(200).json({ success: true, data: rep });
  } catch (err) {
    console.error('Get report error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}

export async function updateReportStatus(req, res) {
  try {
    const role = req.user?.role;
    const allowed = ['admin', 'super_admin', 'university_admin'];
    if (!allowed.includes(role)) return res.status(403).json({ message: 'Forbidden' });

    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'status required' });
    const updated = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Report not found' });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error('Update report error:', err.message);
    return res.status(500).json({ message: 'Server Error' });
  }
}
