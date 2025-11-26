
document.getElementById("predict-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = isNaN(value) ? value : Number(value);
  });

  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    document.getElementById("result").innerHTML =
      `<strong>Predicted Total Demand:</strong> ${result.predicted_demand}%`;
  } catch (err) {
    document.getElementById("result").textContent =
      "Error: Could not connect to prediction server.";
  }
});
