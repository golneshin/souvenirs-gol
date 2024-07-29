import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const __dirname = path.resolve();
const uploadDir = path.join(__dirname, '/frontend/uploads/');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

const upload = multer({ storage, fileFilter });

router.post('/', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).send({ message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).send({ message: err.message });
    }

    // Everything went fine.
    const relativePath = `/uploads/${req.file.filename}`;
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: relativePath,
    });
  });
});

export default router;
