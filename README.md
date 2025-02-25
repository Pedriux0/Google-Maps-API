# Google-Maps-API

## Location App using Google Maps API

This project is a web application that integrates Google Maps API to provide location-based functionalities.

## Features
- Displays an interactive map
- Retrieves and displays the user's current location
- Supports searching for places using the Geocoding API
- Responsive design with Bootstrap styling

## Technologies Used
- HTML, CSS, JavaScript
- Google Maps API (Geolocation & Geocoding)
- Bootstrap

## Setup Instructions

0. Include your own ID and Key
   
2. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/Google-Maps-API.git
   cd Google-Maps-API
   ```
3. Create a `.env` file in the root directory and add your Google Maps API key:
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
4. Install dependencies (if applicable):
   ```sh
   npm install
   ```
5. Run the application:
   ```sh
   npm start
   ```

## API Key Security
- **Never expose your API key** in public repositories.
- Restrict API usage in the [Google Cloud Console](https://console.cloud.google.com/):
  - HTTP referrer restriction (for frontend use)
  - IP restriction (for backend use)


## License
This project is licensed under the MIT License.

## Author
Juan Naranjo

