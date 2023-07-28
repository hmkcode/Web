// script.js
document.addEventListener('DOMContentLoaded', function () {
    const map = document.getElementById('map');
    const earthquakeSymbols = document.getElementById('earthquake-symbols');
  
    function createEarthquakeSymbol(latitude, longitude, magnitude) {
      const earthquake = document.createElement('div');
      earthquake.className = 'earthquake';
      earthquake.style.top = `${latitude}px`;
      earthquake.style.left = `${longitude}px`;
      earthquake.style.width = `${Math.sqrt(magnitude) * 5}px`; // Adjust size based on magnitude
      earthquake.style.height = `${Math.sqrt(magnitude) * 5}px`; // Adjust size based on magnitude
  
      earthquake.addEventListener('click', () => {
        // When clicked, add the "ripple" class and remove it after the animation ends
        earthquake.classList.add('ripple');
        earthquake.innerHTML = magnitude
        setTimeout(() => {
          earthquake.classList.remove('ripple');
          earthquake.innerHTML = '';
        }, 1000); // Match the duration of the animation (1 second)
      });
  
      earthquakeSymbols.appendChild(earthquake);
    }
  
    // Example data (latitude, longitude, magnitude)
    const earthquakeData = [
      { latitude: 100, longitude: 200, magnitude: 3.5 },
      { latitude: 150, longitude: 250, magnitude: 2.2 },
      { latitude: 410, longitude: 450, magnitude: 7.5 },
      // Add more earthquake data here...
    ];
  
    // Add earthquake symbols based on the example data
    earthquakeData.forEach((earthquake) => {
      createEarthquakeSymbol(earthquake.latitude, earthquake.longitude, earthquake.magnitude);
    });
  });
  