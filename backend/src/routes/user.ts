import express from "express";
import multer from "multer";
import {
  changeUserPassword,
  editUserInfo,
  getUserAds,
  getUserInfo,
  getUserPhoto,
  uploadUserPhoto,
} from "../controllers/user";
const router = express.Router();

// Configure multer storage
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Set the file name
  },
});

const upload = multer({ storage: storage });

router.route("/change-password").patch(changeUserPassword);
router
  .route("/profile-photo")
  .post(upload.single("profile-photo"), uploadUserPhoto);

router.route("/:id/profile-photo").get(getUserPhoto);
router.route("/:id/ads").get(getUserAds);
router.route("/:id").patch(editUserInfo).get(getUserInfo);

export default router;
