const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads/');
  },
  filename: (req, file, callback) => {

    callback(null, Date.now() + '-' + file.originalname);
    
  }

});


const uploads = multer({
  storage: storage,
  limits: {
      fileSize: 1 * 4098 * 4098,
      files: 5
  },
  fileFilter: (req, file, cb) => {
      if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/gif" ||
          file.mimetype === "image/jpeg"
      ) {
          cb(null, true)
      } else {
          cb(null, false)
          cb(new Error('Le fichier doit être au format png, jpg, jpeg ou gif.'))
      }
  }
})
 
module.exports = uploads