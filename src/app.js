
// Require necessary modules
const express = require('express'); // Import Express framework
const path = require("path"); // Import path module for working with file paths
const geocode = require('./tools/geocode'); // Import geocode function from tools/geocode.js
const forecast = require('./tools/forecastFile'); // Import forecast function from tools/forecastFile.js

// Initialize Express application
const app = express(); 
const port = process.env.PORT || 3000; // Set the port to the environment variable PORT or default to 3000

// Define the directory containing static files (like: HTML, CSS, images)
const publicLink = path.join(__dirname, '../public');
app.use(express.static(publicLink));

// Set the view engine to Handlebars (hbs)
app.set('view engine', 'hbs');

// Set the directory for views (templates)
const viewsDirectory = path.join(__dirname, '../Temp1/views');
app.set('views', viewsDirectory);

// Route for the home page
app.get('/', (req, res) => {
    // Render the index view with the specified title
    res.render('index', {
        title: "HOME",
    });
});

// Route for fetching weather data
app.get('/weather', (req, res) => {
    // Check if the address query parameter is provided
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    // Use geocode function to get latitude and longitude for the provided address
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        // Use forecast function to get weather forecast data for the provided latitude and longitude
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            // Send the forecast data and location (address) to the client
            res.send({
                forecast: forecastData,
                location: req.query.address
            });
        });
    });
});





// Route for handling all other requests (404 - Page Not Found)
app.get('*', (req, res) => {
    res.send('404 Page Not Found');
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
