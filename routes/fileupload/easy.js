const express = require('express');
const router = express.Router();
const upload = require('../../services/upload'); // Import multer middleware

// Route to render the upload form
router.get('/', (req, res) => {
    res.render('fileupload/easy', { title: 'Upload a File' });
});

// Route to handle file upload
router.post('/upload', (req, res, next) => {
    console.log('Received POST request to /upload');
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error('Error during file upload:', err);
        return res.status(500).render('fileupload/easy', { title: 'Upload a File', message: 'Error during file upload.' });
      }
      next();
    });
  }, (req, res) => {
    if (!req.file) {
      return res.status(400).render('fileupload/easy', { title: 'Upload a File', message: 'No file uploaded.' });
    }
    res.render('fileupload/easy', { title: 'Upload a File', message: `File uploaded successfully: ${req.file.filename}` });
  });
  

module.exports = router;

