const Report = require('../models/Report');
const { cloudinary, isConfigured } = require('../config/cloudinary');

// @desc    Create new cybercrime report
// @route   POST /api/reports
// @access  Public
const createReport = async (req, res) => {
  try {
    const { name, email, phone, crimeType, description } = req.body;

    let evidencePath = '';
    let evidencePublicId = '';
    let evidenceFormat = '';
    let evidenceResourceType = '';
    if (req.file) {
      if (isConfigured) {
        evidencePublicId = req.file.filename;
        evidenceFormat = req.file.format;
        evidenceResourceType = req.file.resourceType;
      } else {
        evidencePath = `/uploads/${req.file.filename}`;
      }
    }

    const report = await Report.create({
      name,
      email,
      phone,
      crimeType,
      description,
      evidencePath,
      evidencePublicId,
      evidenceFormat,
      evidenceResourceType,
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

const getReportEvidence = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.evidencePublicId) {
      const expiresAt = Math.floor(Date.now() / 1000) + 300;
      const url = cloudinary.utils.private_download_url(
        report.evidencePublicId,
        report.evidenceFormat,
        {
          type: 'authenticated',
          resource_type: report.evidenceResourceType,
          expires_at: expiresAt,
        }
      );

      return res.json({ url });
    }

    if (report.evidencePath) {
      return res.json({ url: report.evidencePath });
    }

    res.status(404).json({ message: 'Report has no evidence file' });
  } catch (error) {
    console.error('Error retrieving report evidence:', error);
    res.status(500).json({ message: 'Unable to retrieve report evidence' });
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
  getReportEvidence,
  getReports,
  deleteReport,
  updateReportStatus
};
