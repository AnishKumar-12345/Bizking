import axios from "axios";
import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    notifications: JSON.parse(localStorage.getItem('notifications')) || [], // Load from localStorage
    outputSalesOrders: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setNotifications(state, notifications) {
      state.notifications = notifications;
      localStorage.setItem('notifications', JSON.stringify(notifications)); // Save to localStorage
    },
    setOutputSalesOrders(state, data) {
      state.outputSalesOrders = data;
    },
  },
  actions: {
    getOutputSaleOrdersdata({ commit }) {
      // console.log('check the response')
      return axios 
        .get("http://103.211.218.32/bizkingz/services/api/sales/getAckSalesOrders", {
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
  modules: {},
});

export default store;
