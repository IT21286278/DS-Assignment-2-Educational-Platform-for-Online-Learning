import React, { useState } from "react";
import { createCompany } from "../api/company";
import Loading from "../components/Loading";
import UploadWidget from "../components/UploadWidget";

const CreateCompanyScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const result = await createCompany({ name, description, logo, status });
    // if (!result.error) {
    //   alert("Company created successfully");
    //   setName("");
    //   setDescription("");
    //   setLogo(null);
    //   setStatus("");
    //   setError("");
    // } else {
    //   setError(result.error);
    // }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container w-75 shadow p-4 my-5 h-50">
      <h1 className="mb-4">Create Company</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            placeholder="Enter company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="companyDescription"
            rows="3"
            placeholder="Enter company description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="companyLogo" className="form-label">
            Company Logo
          </label>
          {/* <input
            type='file'
            className='form-control-file'
            id='companyLogo'
            onChange={(e) => setLogo(e.target.files[0])}
          /> */}
          <UploadWidget onUpload={setLogo} />
          {/* {logo && (
            <img
              src={logo}
              alt="Company Logo"
              className="img-fluid
          mt-2
          w-50
          h-50
          
          

          "
              style={{ maxWidth: "200px" }}
            />
          )} */}
        </div>

        <div className="mb-3">
          <label htmlFor="companyStatus" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="companyStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateCompanyScreen;
