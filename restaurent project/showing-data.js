const jsonFile = "http://localhost:4000/restaurents";
const container = document.getElementById("restaurantList");
let restaurantData = []; 


function showError(message) {
  container.innerHTML = `<p style="color: red;">${message}</p>`;
}
















document.getElementById("searchBtn").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();

  if (!searchTerm) {
    showError("Please enter a search term.");
    return;
  }

  const results = restaurantData.filter((restaurant) =>
    restaurant.name?.toLowerCase().includes(searchTerm)
  );

  if (results.length === 0) {
    showError("No matching restaurants found.");
  } else {
    displayRestaurants(results);
    container.scrollIntoView({ behavior: "smooth" });
  }
});

fetch(jsonFile)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    console.error(`HTTP error! Status: ${response.status}`);
    showError("Failed to load restaurants. Please try again later.");
    return null; 
  })
  .then((data) => {
    if (data && Array.isArray(data)) {
      restaurantData = data; 
      displayRestaurants(data); 
    } else if (data) {
      console.error("Invalid data format. Expected an array.");
      showError("Failed to load restaurants. Please try again later.");
    }
  })
  .catch((error) => {
    console.error("Error fetching the JSON file:", error);
    showError("Failed to load restaurants. Please try again later.");
  });


function displayRestaurants(data = []) {
  container.innerHTML = "";
  if (!Array.isArray(data) || data.length === 0) {
    showError("No restaurants found.");
    return;
  }

  data.forEach((restaurant) => {
    const title = restaurant.name || "Unnamed Restaurant";
    const restaurantDiv = `
      <div class="restaurant">
        <img src="${restaurant.restaurant_pic || "https://via.placeholder.com/100"}" alt="${title}">
        <div>
          <h3>${title}</h3>
          <p>${restaurant.specialty || "Specialty not available"}</p>
          <p class="rating">Rating: ${restaurant.rating || "Not Rated"}</p>
        </div>
      </div>`;
    container.innerHTML += restaurantDiv;
  });
}
