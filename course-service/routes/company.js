import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
} from "../controllers/company.js";

const router = express.Router();

import upload from "../middlewares/multer.js";

router.post("/createCompany", upload.single("logo"), createCompany);
router.get("/getCompany/:id", getCompany);
router.get("/getAllCompanies", getAllCompanies);
router.put("/updateCompany", upload.single("logo"), updateCompany);

export default router;
