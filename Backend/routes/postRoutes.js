const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  createPost,
  getAllPosts,
  getMyPosts,
  updatePost,
  deletePost,
  getPostById,
  toggleLike,
  toggleSave,   
  toggleUnsave,
  getSavedPosts,
  getLikedPosts, 
} = require('../controllers/postController'); 
const verifyToken = require('../middlewares/authMiddleware'); 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG, and GIF are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get('/saved', verifyToken, getSavedPosts);
router.get('/liked', verifyToken, getLikedPosts);
router.post('/create',verifyToken,upload.single('recipeImage'),createPost);
router.get('/all', getAllPosts);

router.get('/myposts', verifyToken, getMyPosts);

router.put(
  '/:id',
  verifyToken,
  upload.single('recipeImage'),
  updatePost
);
router.patch('/:id', verifyToken, upload.single('recipeImage'), updatePost);
router.delete('/:id', verifyToken, deletePost);

router.get('/saved', getSavedPosts);
router.post('/:id/like', verifyToken, toggleLike);
router.post('/:id/save', verifyToken, toggleSave); 
router.delete('/:id/save', verifyToken, toggleUnsave);
router.patch(
    '/:id',
    verifyToken,
    upload.single('recipeImage'),
    updatePost
);
router.get('/:id', getPostById);
module.exports = router;