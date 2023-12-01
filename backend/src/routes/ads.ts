import express from "express";
import { addAd, editAd, deleteAd, getAllAds } from "../controllers/ads";
const router = express.Router();

router.route("/").get(getAllAds).post(addAd);
router.route("/:id").patch(editAd).delete(deleteAd);

export default router;
