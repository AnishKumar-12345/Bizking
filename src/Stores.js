import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    notifications: JSON.parse(localStorage.getItem('notifications')) || [], // Load from localStorage
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setNotifications(state, notifications) {
      state.notifications = notifications;
      localStorage.setItem('notifications', JSON.stringify(notifications)); // Save to localStorage
    },
  },
  actions: {},
  modules: {},
});

export default store;
