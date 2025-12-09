// StAuth10244: I Juan Naranjo , 000895164 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

// Global variables
let map, markers = [], userMarker, directionsService, directionsRenderer;


// List of locations with their details (name, type, coordinates, and website)
const locations = [
    // Parks
    { name: "Hemming Park", type: "Park", lat: 43.0934, lng: -79.9602, website: "https://www.hwcdsb.ca/" },
    { name: "87 Acres Park", type: "Park", lat: 43.1775, lng: -79.6642, website: "https://www.hwcdsb.ca/" },
    { name: "A.M. Cunningham Park", type: "Park", lat: 43.2443, lng: -79.8107, website: "https://www.hwcdsb.ca/" },
    { name: "Agro Park", type: "Park", lat: 43.3365, lng: -79.8829, website: "https://www.hwcdsb.ca/" },
    { name: "Albion Falls", type: "Park", lat: 43.2003, lng: -79.8200, website: "https://www.hwcdsb.ca/" },
    { name: "Albion Falls Open Space", type: "Park", lat: 43.2007, lng: -79.8219, website: "https://www.hwcdsb.ca/" },
    { name: "Albion Falls Park", type: "Park", lat: 43.2014, lng: -79.8190, website: "https://www.hwcdsb.ca/" },
    { name: "Alexander Park", type: "Park", lat: 43.2528, lng: -79.9277, website: "https://www.hwcdsb.ca/" },
    { name: "Bobby Kerr Park", type: "Park", lat: 43.2171, lng: -79.8397, website: "https://www.hwcdsb.ca/" },
    { name: "Borer's Dog Park", type: "Park", lat: 43.2896, lng: -79.9268, website: "https://www.hwcdsb.ca/" },

    // Museums
    { name: "Art Gallery of Hamilton", type: "museum", lat: 43.2575, lng: -79.8722, website: "https://www.hwcdsb.ca/" },
    { name: "Whitehern Historic House & Garden", type: "museum", lat: 43.2547, lng: -79.8721, website: "https://www.hwcdsb.ca/" },

    // Restaurants
    { name: "The Mule Hamilton", type: "restaurant", lat: 43.2573, lng: -79.8673, website: "https://www.hwcdsb.ca/" },
    { name: "Brothers Grimm Bistro", type: "restaurant", lat: 43.2551, lng: -79.8633, website: "https://www.hwcdsb.ca/" },
    { name: "The Ship", type: "restaurant", lat: 43.2522, lng: -79.8699, website: "https://www.hwcdsb.ca/" },
];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 43.2557, lng: -79.8711 }, // Hamilton coordinates
      zoom: 12,
      mapId: "5471da34b982e556", 
    });
  
    // Initialize directions service and renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
  
    // Add markers for all locations
    addMarkers(locations);
  
    // Populate the destination dropdown
    populateDestinationDropdown();
  
    // Set up event listeners
    setupEventListeners();
  }

// Add markers to the map
function addMarkers(locationsArray) {
    clearMarkers(); // Clear existing markers
    locationsArray.forEach(location => markers.push(createMarker(location)));
}

// Create an Advanced Marker with an info window
function createMarker(location) {
    // Create the Advanced Marker
    const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
    });

    // Add an info window to the marker
    const infoWindow = new google.maps.InfoWindow({
        content: `<strong>${location.name}</strong><br>Category: ${location.type}`,
    });

    // Show info window when marker is clicked
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
    });

    return marker;
}

// Clear all markers from the map
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// Filter markers by category
function filterMarkers(category) {
    const filtered = category === "all" ? locations : locations.filter(loc => loc.type === category);
    addMarkers(filtered);
}

// Get the user's current location
function getUserLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    // Request high-accuracy location
    const options = {
      enableHighAccuracy: true, // Request high-accuracy location
      timeout: 5000, // Time of waiting 
      maximumAge: 0, // Do not use a cached location
    };
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
  
        // Update or create the user marker
        updateUserMarker(userPos);
  
        // Center the map on the user's location
        map.setCenter(userPos);
        map.setZoom(15);
      },
      (error) => {
        alert("Your location is off please try again");
        console.error("Geolocation error:", error);
      },
      options // Pass the high-accuracy options
    );
  }
// Update or create the user marker
function updateUserMarker(position) {
    if (userMarker) {
      userMarker.setMap(null); // Remove marker
    }
  
    // Add a new user marker with a custom icon
    userMarker = new google.maps.Marker({
      position,
      map,
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue dot icon
        scaledSize: new google.maps.Size(30, 30), 
      },
      title: "Your Location",
    });
  }

// Add a new marker using the Geocoding API
function addNewMarker() {
    const address = document.getElementById("address").value.trim();
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();

    if (!address || !name) {
        alert("Please enter an address and a name.");
        return;
    }

    // Use the Geocoding API to convert the address to coordinates
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
            const location = results[0].geometry.location;
            const newLocation = {
                name,
                lat: location.lat(),
                lng: location.lng(),
                type: category,
            };

            // Add the new marker to the map
            const marker = createMarker(newLocation);
            markers.push(marker);

            // Add the new location to the list
            locations.push(newLocation);

            // Center the map on the new marker
            map.setCenter(location);
        } else {
            alert("Geocoding failed: " + status);
        }
    });
}

// Get directions from the user's location to a selected destination
function getDirections() {
    // Check if the user's location is available
    if (!userMarker) {
      alert("Please enable geolocation first!");
      return;
    }
  
    // Get the selected destination
    const destination = document.getElementById("destination").value.trim();
    const selectedLocation = locations.find(loc => loc.name === destination);
  
    // Check if a valid destination is selected
    if (!selectedLocation) {
      alert("Invalid destination!");
      return;
    }
  
    // Set up the directions request
    const request = {
      origin: userMarker.position, // User's current location
      destination: new google.maps.LatLng(selectedLocation.lat, selectedLocation.lng), // Selected destination
      travelMode: "DRIVING", // Can be "DRIVING", "WALKING", "BICYCLING", or "TRANSIT"
    };
  
    // Calculate and display directions
    directionsService.route(request, (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result); // Display the route on the map
      } else {
        alert("Directions request failed: " + status);
      }
    });
  }
  function populateDestinationDropdown() {
    const destinationDropdown = document.getElementById("destination");
    destinationDropdown.innerHTML = '<option value="">Select Destination</option>'; // Reset the dropdown
  
    // Add each location to the dropdown
    locations.forEach(location => {
      const option = document.createElement("option");
      option.value = location.name;
      option.textContent = location.name;
      destinationDropdown.appendChild(option);
    });
  }
// Set up event listeners for buttons and forms
function setupEventListeners() {
    // Filter buttons
    document.getElementById("filter-parks").addEventListener("click", () => filterMarkers("Park"));
    document.getElementById("filter-museums").addEventListener("click", () => filterMarkers("museum"));
    document.getElementById("filter-restaurants").addEventListener("click", () => filterMarkers("restaurant"));
    document.getElementById("filter-all").addEventListener("click", () => filterMarkers("all"));

    // Geolocation button
    document.getElementById("geolocation-btn").addEventListener("click", getUserLocation);

    // Add new marker form
    document.getElementById("add-marker-form").addEventListener("submit", (e) => {
        e.preventDefault();
        addNewMarker();
    });

    // Directions button
    document.getElementById("get-directions").addEventListener("click", getDirections);
}

// Initialize the map when the page loads
window.onload = initMap;
