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
import authorizeUser from "../middleware/authorization";

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

router.route("/:id/profile-photo").get(getUserPhoto);

router.route("/change-password").patch(authorizeUser, changeUserPassword);
router
  .route("/profile-photo")
  .post(authorizeUser, upload.single("profile-photo"), uploadUserPhoto);

router.route("/:id/ads").get(authorizeUser, getUserAds);
router
  .route("/:id")
  .patch(authorizeUser, editUserInfo)
  .get(authorizeUser, getUserInfo);

export default router;
