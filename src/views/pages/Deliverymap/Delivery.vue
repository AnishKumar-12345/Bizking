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
export default {
  data() {
    return {
      map: null,
      truckMarker: null,
     locations: [
        // { id: 1, name: 'Delhi', lat: 28.6139, lng: 77.209 },
        { id: 2, name: 'Mumbai', lat: 19.076, lng: 72.8777 },
        { id: 3, name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
        // { id: 4, name: 'Chennai', lat: 13.0827, lng: 80.2707 }
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
  this.map = new google.maps.Map(this.$refs.map, {
    center: { lat: 20.5937, lng: 78.9629 }, // Center of India
    zoom: 5 // Zoom level to see entire India
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
    startJourney() {
      // Start tracking truck's movement
      this.journeyStarted = true;
      this.truckMarker = new google.maps.Marker({
        map: this.map,
        title: 'Truck'
      });

      const interval = setInterval(() => {
        // Simulate truck movement towards the next location
        if (this.currentLocationIndex < this.locations.length) {
          const nextLocation = this.locations[this.currentLocationIndex];
          const latLng = new google.maps.LatLng(nextLocation.lat, nextLocation.lng);
          this.truckMarker.setPosition(latLng);

          // Check if truck has reached the destination
          if (this.truckMarker.getPosition().equals(latLng)) {
            this.currentLocationIndex++;
            if (this.currentLocationIndex === this.locations.length) {
              clearInterval(interval); // Truck reached all locations, stop tracking
              alert("Truck reached all locations!");
              this.journeyStarted = false;
            }
          }
        }
      }, 3000); // Simulate truck movement every 3 seconds
    }
  }
}
</script>

<style>
/* Add any custom styles here */
</style>
