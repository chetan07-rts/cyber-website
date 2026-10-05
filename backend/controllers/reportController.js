const Report = require('../models/Report');

// @desc    Create new cybercrime report
// @route   POST /api/reports
// @access  Public
const createReport = async (req, res) => {
  try {
    const { name, email, phone, crimeType, description } = req.body;

    let evidencePath = '';
    if (req.file) {
      evidencePath = `/uploads/${req.file.filename}`;
    }

    const report = await Report.create({
      name,
      email,
      phone,
      crimeType,
      description,
      evidencePath,
      status: 'Pending',
    });

    // Mock Email Send
    console.log(`\n\n--- MOCK EMAIL ---`);
    console.log(`To: ${email}`);
    console.log(`Subject: NCSPP Report Received: ${report._id}`);
    console.log(`Body: Dear ${name}, we have received your report regarding ${crimeType}. Our cyber cell is investigating.`);
    console.log(`File attached: ${evidencePath}`);
    console.log(`------------------\n\n`);

    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private/Admin
const getReports = async (req, res) => {
  try {
    const reports = await Report.find({}).sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete report
// @route   DELETE /api/reports/:id
// @access  Private/Admin
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (report) {
      await Report.findByIdAndDelete(req.params.id);
      res.json({ message: 'Report removed' });
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update report status
// @route   PUT /api/reports/:id/status
// @access  Private/Admin
const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);

    if (report) {
      report.status = status;
      const updatedReport = await report.save();
      res.json(updatedReport);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = {
  createReport,
  getReports,
  deleteReport,
  updateReportStatus
};
