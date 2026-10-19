import multer from "multer";

const storage = multer.memoryStorage();

const resourceUpload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200 MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow any standard document, zip, or media file upload
    cb(null, true);
  },
});

export default resourceUpload;
