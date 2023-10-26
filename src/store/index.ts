import axios from 'axios';
import { createStore } from '../../node_modules/vuex';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface State {
  users: User[];
}

const loadUsersFromLocalStorage = (): User[] => {
  const usersData = localStorage.getItem('users');
  return usersData ? JSON.parse(usersData) : [];
};

export default createStore<State>({
  state: {
    users: loadUsersFromLocalStorage(),
  },
  mutations: {
    setUsers(state, users: User[]) {
      state.users = users;
      localStorage.setItem('users', JSON.stringify(users));
    },
    updateUser(state, updatedUser: User) {
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
        localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://reqres.in/api/users');
        const users: User[] = response.data.data;
        commit('setUsers', users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    updateUser({ commit }, updatedUser: User) {
      commit('updateUser', updatedUser);
    },
  },
  modules: {},
});
