import React, { useState } from "react";
import { createCompany } from "../api/company";
import Loading from "../components/Loading";

const CreateCompanyScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  console.log("🚀 ~ CreateCompanyScreen ~ logo:", logo);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const result = await createCompany({ name, description, logo, status });
    if (!result.error) {
      alert("Company created successfully");
      setName("");
      setDescription("");
      setLogo(null);
      setStatus("");
      setError("");
    } else {
      setError(result.error);
    }
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container w-75 shadow p-10">
      <h1>Create Company</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group d-flex ">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Enter company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyDescription">Description</label>
          <textarea
            className="form-control"
            id="companyDescription"
            rows="3"
            placeholder="Enter company description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyLogo">Company Logo</label>
          <input
            type="file"
            className="form-control-file"
            id="companyLogo"
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyStatus">Status</label>
          <select
            className="form-control"
            id="companyStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCompanyScreen;
