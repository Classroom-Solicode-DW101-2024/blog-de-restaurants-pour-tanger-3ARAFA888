
const express = require("express");
const fs = require('fs');
const cors = require('cors')
const path = require("path");
const app = express();
const port = 4000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(cors())
// read data from JSON file
function readData() {
    const data = fs.readFileSync(path.join(__dirname, 'restaurents.json'), 'utf-8');
    return JSON.parse(data);
}

const data = require(path.join(__dirname, "restaurents.json"));

// read data from JSON file
function saveData(data) {
    fs.writeFileSync('restaurents.json', JSON.stringify(data, null, 2));
}


app.get('/restaurents', (req, res) => {
    // const restaurents = readData();
    // res.json(restaurents);
    res.json(data);
});
app.get('/restaurents/:name', (req, res) => {
    // const restaurents = readData();
    const restaurent = data.find(st => st.name === req.params.name);

    if (!restaurent) return res.status(404).send('restaurant non trouvé');
    res.json(restaurent);
});


app.post('/restaurents', (req, res) => {
    const restaurents = readData();
    const newRestaurents = {
        // id: restaurents.length + 1,
        // name: req.body.name,
        // age: req.body.age,
        // major: req.body.major
        restaurent_pic:req.body.restaurent_pic,
        name:req.body.name,
        specialty:req.body.specialty,
        rating:req.body.rating,
        detail:req.body.detail
    };
    restaurents.push(newRestaurents);
    saveData(restaurents);
    res.status(201).json(newRestaurents);
});


app.put('/restaurents/:name', (req, res) => {
    const restaurents = readData();
    const restaurant = restaurents.find(st => st.name === req.params.name);


    if (!restaurant) return res.status(404).send('Restaurant non trouvé');

    // restaurant.name = req.body.name||restaurant.name;
    // restaurant.age = req.body.age||restaurant.age;
    // restaurant.major = req.body.major||restaurant.major;
    
    restaurant.restaurent_pic = req.body.restaurent_pic || restaurant.restaurent_pic;
    restaurant.name = req.body.name || restaurant.name;restaurant.specialty = req.body.specialty || restaurant.specialty;
    restaurant.rating = req.body.rating || restaurant.rating;restaurant.detail = req.body.detail || restaurant.detail;



    saveData(restaurents);
    res.json(restaurant);

});


app.delete('/restaurents/:name', (req, res) => {
    let restaurents = readData();
    restaurents = restaurents.filter(st => st.name !== req.params.name);

    if (restaurents.length === readData().length) return res.status(404).send('restuarant non trouvé');

    saveData(restaurents);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})

// const jsonFile = 'http://localhost:4000/restaurents';

// fetch(jsonFile)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log("Restaurants Data:", data);  // Log the data to see the structure
//     displayRestaurants(data);  // Call the function to display restaurants
//   })
//   .catch(error => {
//     console.error('Error fetching the JSON file:', error);
//     const container = document.getElementById("restaurantList");
//     container.innerHTML = "<p>Failed to load restaurants. Please try again later.</p>";
//   });

