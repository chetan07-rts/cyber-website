const express = require('express');
const router = express.Router();
const {
  createReport,
  getReports,
  deleteReport,
  updateReportStatus
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .post(upload.single('evidence'), createReport)
  .get(protect, getReports);

router.route('/:id')
  .delete(protect, deleteReport);

router.route('/:id/status')
  .put(protect, updateReportStatus);

module.exports = router;
