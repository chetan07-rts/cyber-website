const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadDir = path.join(__dirname, '..', 'uploads');
let storage;

if (cloudinary.isConfigured) {
  storage = {
    _handleFile(req, file, callback) {
      const resourceType = file.mimetype.startsWith('image/') ? 'image' : 'raw';
      const stream = cloudinary.cloudinary.uploader.upload_stream({
        folder: 'cyber-website/reports',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
        resource_type: resourceType,
        type: 'authenticated',
      }, (error, result) => {
        if (error) {
          return callback(error);
        }

        callback(null, {
          path: result.secure_url,
          size: result.bytes,
          filename: result.public_id,
          format: result.format,
          resourceType: result.resource_type,
        });
      });

      file.stream.pipe(stream);
    },
    _removeFile(req, file, callback) {
      cloudinary.cloudinary.uploader.destroy(file.filename, {
        resource_type: file.resourceType,
        type: 'authenticated',
        invalidate: true,
      }, callback);
    },
  };
} else {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
}

const allowedTypes = new Map([
  ['.jpg', ['image/jpeg']],
  ['.jpeg', ['image/jpeg']],
  ['.png', ['image/png']],
  ['.pdf', ['application/pdf']],
  ['.doc', ['application/msword']],
  ['.docx', ['application/vnd.openxmlformats-officedocument.wordprocessingml.document']],
]);

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    const allowedMimeTypes = allowedTypes.get(path.extname(file.originalname).toLowerCase());

    if (allowedMimeTypes?.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(new Error('Images and documents only'));
  },
});

module.exports = upload;
