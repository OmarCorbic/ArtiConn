import express from "express";
import { addAd, editAd, deleteAd, getAllAds } from "../controllers/ads";
import authorizeUser from "../middleware/authorization";
const router = express.Router();

router.route("/").get(getAllAds).post(authorizeUser, addAd);
router
  .route("/:id")
  .patch(authorizeUser, editAd)
  .delete(authorizeUser, deleteAd);

export default router;
