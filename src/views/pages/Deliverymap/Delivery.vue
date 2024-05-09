<template>
  <v-card>
    <v-card-title>Location Tracker</v-card-title>
    <v-card-text>
      <div ref="map" style="height: 400px;"></div>
      <v-btn @click="startJourney" v-if="!journeyStarted">Start Journey</v-btn>
      <v-btn disabled v-else>Truck is on its way</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  name: 'LocationTracker',
  data() {
    return {
      map: null,
      truckMarker: null,
      locations: [
        { name: 'SLN TERMINALS', lat: 17.452, lng: 78.3641 },
        { name: 'IKEA', lat: 17.4387591, lng: 78.3751236 },
        { name: 'lulu', lat: 17.4899592, lng: 78.3931159 },
        { name: 'inorbit', lat: 17.4345546, lng: 78.3866982 },
        { name: 'Shilparamam', lat: 17.4514663, lng: 78.3774635 }
      ],
      currentLocationIndex: 0,
      journeyStarted: false
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // Initialize Google Map
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: 17.452, lng: 78.3641 }, // Centering map on SLN TERMINALS
        zoom: 12 // Zoom level to see nearby locations
      });

      // Display markers for each location
      this.locations.forEach(location => {
        new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          title: location.name
        });
      });
    },
    async startJourney() {
      // Start tracking truck's movement
      this.journeyStarted = true;

      // Get current user's location
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Create truck marker at user's location
        this.truckMarker = new google.maps.Marker({
          position: userLocation,
          map: this.map,
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 6,
            strokeColor: '#FF0000',
            fillColor: '#FF0000',
            fillOpacity: 1,
            rotation: 0
          }
        });

        // Start journey towards the first location
        this.moveTruck(userLocation, this.locations[0]);
      }, error => {
        console.error('Error getting user location:', error);
      });
    },
    moveTruck(currentLocation, destination) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route({
        origin: currentLocation,
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: 'DRIVING'
      }, (result, status) => {
        if (status === 'OK') {
          const directionsRenderer = new google.maps.DirectionsRenderer();
          directionsRenderer.setMap(this.map);
          directionsRenderer.setDirections(result);

          const nextStep = result.routes[0].legs[0].steps[0];
          const nextStepEndLocation = nextStep.end_location;

          // Simulate truck movement towards the next location
          const moveInterval = setInterval(() => {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(this.truckMarker.getPosition(), nextStepEndLocation);
            if (distance > 10) { // Keep moving if not reached destination yet
              const heading = google.maps.geometry.spherical.computeHeading(this.truckMarker.getPosition(), nextStepEndLocation);
              const newPosition = google.maps.geometry.spherical.computeOffset(this.truckMarker.getPosition(), 10, heading);
              this.truckMarker.setPosition(newPosition);
            } else { // Truck reached the destination
              clearInterval(moveInterval);
              if (this.currentLocationIndex < this.locations.length - 1) { // Move to the next location
                this.currentLocationIndex++;
                this.moveTruck(nextStepEndLocation, this.locations[this.currentLocationIndex]);
              } else { // Truck reached all locations
                alert("Truck reached all locations!");
                this.journeyStarted = false;
              }
            }
          }, 2000); // Move truck every 2 seconds
        } else {
          console.error('Directions request failed due to ' + status);
        }
      });
    }
  }
};
</script>

<style>
/* Add any custom styles here */
</style>
