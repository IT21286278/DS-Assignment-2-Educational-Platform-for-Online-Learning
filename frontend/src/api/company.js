export const createCompany = async (company) => {
  try {
    console.log(company);
    const response = await fetch(
      "http://localhost:8001/company/createCompany",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating company", error);
  }
};
