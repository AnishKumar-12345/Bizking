import axios from "axios";
import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: {
    selectedItem: null,
    user: null,
    notifications: JSON.parse(localStorage.getItem('notifications')) || [], // Load from localStorage
    sodetails: JSON.parse(localStorage.getItem('sodetails')) || [], // Load from localStorage
    deliverydetails: JSON.parse(localStorage.getItem('deliverydetails')) || [], // Load from localStorage
    outputSalesOrders: {},
  },
  mutations: {
    setSelectedItem(state, item) {
      state.selectedItem = item;
    },
    clearSelectedItem(state) { 
      state.selectedItem = null;
    },
    setUser(state, user) {
      state.user = user;
    },
    setNotifications(state, notifications) {
      state.notifications = notifications;
      localStorage.setItem('notifications', JSON.stringify(notifications)); // Save to localStorage
    },
    setsodetails(state, sodetails) {
      state.sodetails = sodetails;
      localStorage.setItem('sodetails', JSON.stringify(sodetails)); // Save to localStorage
    },
    setDeliverydetails(state, deliverydetails) {
      state.deliverydetails = deliverydetails;
      localStorage.setItem('deliverydetails', JSON.stringify(deliverydetails)); // Save to localStorage
    },
    setOutputSalesOrders(state, data) {
      state.outputSalesOrders = data;
    },
  },
  actions: {
    // getOutputSaleOrdersdata({ commit }, {city_id}) {
    //   // console.log('check the response')
    //   return axios 
    //     .get(`http://103.211.218.32/bizkingz/services/api/sales/getAckSalesOrders?city_id=${city_id}`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "accept": "*/*",
    //         // "Authorization": "Bearer " + token, // Include Authorization if needed
    //       },
    //     })
    //     .then(response => {
    //       // console.log('check the response')
    //       commit('setOutputSalesOrders', response.data);          
    //       return response.data; // Optional: return the data if needed
    //     })
    //     .catch(error => {
    //       console.error('Error fetchin g sales orders:', error);
    //       throw error; // Optional: rethrow the error for the calling code to handle
    //     });
    // },
    getOutputSaleOrdersdata2({ commit }, {city_id,location_id}) {
      // console.log('check the response')
      return axios 
        .get(`http://103.211.218.32/bizkingz/services/api/sales/getAckSalesOrders?city_id=${city_id}&location_id=${location_id}`, {
          headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            // "Authorization": "Bearer " + token, // Include Authorization if needed
          },
        })
        .then(response => {
          // console.log('check the response')
          commit('setOutputSalesOrders', response.data);          
          return response.data; // Optional: return the data if needed
        })
        .catch(error => {
          console.error('Error fetching sales orders:', error);
          throw error; // Optional: rethrow the error for the calling code to handle
        });
    },
  },
  plugins: [createPersistedState()],
  modules: {},
});



export default store;
