
const form = document.getElementById('form1');
const errorF = document.getElementById('error');
const locationF = document.getElementById('location');
const temperatureP = document.getElementById('temperature');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    weather()
    form.reset()
})



// Function to fetch weather data
const weather = async () => {
    try {
        // Get the address from the input field
        const address = document.getElementById('address').value;
        // Fetch weather data from the server
        const ser = await fetch('http://localhost:3000/weather?address=' + address);
        // Parse the JSON response
        const data = await ser.json();
        // Check for errors in the response
        if (data.error) {
            // Display the error message if present
            errorF.innerText = data.error;
            // Clear the other fields
            locationF.innerText = '';
            temperatureP.innerText = '';
            latitude.innerText = '';
            longitude.innerText = '';
        } else {
            // If no errors, extract location and forecast data
            const { location, forecast } = data;
            // Clear the error message
            errorF.innerText = '';
            // Display the temperature with a delay of 0 milliseconds
            displayWithDelay(temperatureP, ` ${forecast.temperature}`, 0);
            // Display the location with a delay of 500 milliseconds
            displayWithDelay(locationF, location, 500);
            // Display the latitude with a delay of 1000 milliseconds
            displayWithDelay(latitude, ` ${forecast.latitude}`, 1000);
            // Display the longitude with a delay of 1500 milliseconds
            displayWithDelay(longitude, ` ${forecast.longitude}`, 1500);
        }
    } catch (e) {
        console.log(e); // Log any errors to the console
    }
};

// Function to display text with a delay
const displayWithDelay = (element, text, delay) => {
    setTimeout(() => {
        element.innerText = text; // Set the text of the element after the delay
    }, delay);
};











