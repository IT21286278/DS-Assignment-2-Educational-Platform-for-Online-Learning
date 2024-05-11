import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/company.js";

const router = express.Router();

import upload from "../middlewares/multer.js";

router.post("/createCompany", createCompany);
router.get("/getCompany/:id", getCompany);
router.get("/getAllCompanies", getAllCompanies);
router.put("/updateCompany", upload.single("logo"), updateCompany);
router.delete("/deleteCompany/:id", deleteCompany);

export default router;
