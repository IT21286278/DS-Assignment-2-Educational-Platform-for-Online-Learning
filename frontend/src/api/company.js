export const createCompany = async (company) => {
  try {
    const formData = new FormData();
    formData.append("name", company.name);
    formData.append("description", company.description);
    formData.append("logo", company.logo);
    formData.append("status", company.status);

    const response = await fetch(
      "http://localhost:8001/company/createCompany",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating company", error);
  }
};
