const jsonFile = "http://localhost:4000/restaurents";

const admin_container=document.getElementById("container_admin");
const admin_button=document.getElementById("admin_button")

let restaurantData = []; 


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
    admin_container.innerHTML = "";
    if (!Array.isArray(data) || data.length === 0) {
      showError("No restaurants found.");
      return;
    }
  
    data.forEach((restaurant) => {
      const title = restaurant.name || "Unnamed Restaurant";
    //   const restaurantDiv = `
    //     <div class="restaurant">
    //       <img src="${restaurant.restaurant_pic || "https://via.placeholder.com/100"}" alt="${title}">
    //       <div>
    //         <h3>${title}</h3>
    //         <p>${restaurant.specialty || "Specialty not available"}</p>
    //         <p class="rating">Rating: ${restaurant.rating || "Not Rated"}</p>
    //       </div>
    //     </div>
    //     `;
      const restaurantDiv =`
            <table >
                <tr >
                    <td ><img src="${restaurant.restaurant_pic || "https://via.placeholder.com/100"}" alt="${title}"></td>
                    <td><p>${title}</p></td>
                    <td><p>${restaurant.specialty || "Specialty not available"}</p></td>
                    <td><p class="rating">Rating: ${restaurant.rating || "Not Rated"}</p></td>
                    <td><button id="delete">Delete</button></td>
                </tr>
            </table>
      `
      admin_container.innerHTML += restaurantDiv;
    });
  }
  function delete_restaurant(index) {
    const deleted_restarant = restaurantData[index];

    if (confirm(` Are you sure you want to delete "${deleted_restarant.name}"?` )) {
        fetch(`${jsonFile}/${deleted_restarant.name}`) ({
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete restaurant');
            }
            restaurants.splice(index, 1); // Remove from cache
            displayRestaurants(restaurantData)
                })
        .catch(error => {
            console.log('Error deleting restaurant:', error);
        });
    }
}`
