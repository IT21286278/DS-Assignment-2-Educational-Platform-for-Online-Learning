import Company from "../models/Company.js";
import cloudinary from "../middlewares/cloudinary.js";

export const createCompany = async (req, res) => {
  const { name, description, status } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded" });
  }
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const logo = result.secure_url;

    const company = new Company({
      name,
      description,
      logo,
      status,
    });
    await company.save();

    res.status(201).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file was uploaded" });
  }

  try {
    const company = await Company.findById(req.body.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Delete the existing video
    const publicId = company.logo.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    // Upload the new video
    const result = await cloudinary.uploader.upload(req.file.path);
    const logo = result.secure_url;

    // Update the company
    company.name = req.body.name;
    company.description = req.body.description;
    company.logo = logo;
    company.status = req.body.status;
    await company.save();

    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
