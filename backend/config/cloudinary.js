const cloudinary = require('cloudinary').v2;

const cloudinarySettings = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};
const configuredSettings = Object.values(cloudinarySettings).filter(Boolean).length;

if (configuredSettings > 0 && configuredSettings < Object.keys(cloudinarySettings).length) {
  throw new Error('Configure all Cloudinary environment variables or remove them');
}

if (process.env.NODE_ENV === 'production' && configuredSettings === 0) {
  throw new Error('Cloudinary must be configured in production for report evidence storage');
}

const isConfigured = configuredSettings === Object.keys(cloudinarySettings).length;

if (isConfigured) {
  cloudinary.config(cloudinarySettings);
}

module.exports = { cloudinary, isConfigured };
