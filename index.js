// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Display the weather alerts on the page
function displayWeather(data) {
  const alerts = data.features || [];
  alertsDisplay.innerHTML = "";

const heading = document.createElement("h2");
 heading.textContent = `${data.title || "Weather Alerts"}: ${alerts.length}`;
 alertsDisplay.appendChild(heading);
  
 alerts.forEach((alert) => {
   const headline = document.createElement("p");
   headline.textContent =
    alert.properties?.headline || "Weather alert details unavailable";
  
    alertsDisplay.appendChild(headline);
  });
}

// Display an error message
function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

// Fetch weather alerts for the entered state
async function fetchWeatherData(state) {
  try {
    const response = await fetch(`${weatherApi}${state}`);

  if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const data = await response.json();

    displayWeather(data);

    // Clear any previous error after a successful request
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
} catch (error) {
    displayError(error.message);
    }
}

// Handle the button click
fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();

  //Clear the input after clicking
  stateInput.value = "";

  // Fetch alerts only if a state was entered
  if (state) {
    fetchWeatherData(state);
  }
});