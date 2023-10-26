<template>
  <div>
    <form @submit.prevent="saveChanges">
      <div>
        <label for="first_name">
          <el-text class="text" type="primary">Firs Name</el-text>
        </label>
        <el-input
          v-model="user.first_name"
          type="text"
          id="first_name"
          required
        />
      </div>
      <div class="block">
        <label for="last_name">
          <el-text class="text" type="primary">Last Name:</el-text>
        </label>
        <el-input
          v-model="user.last_name"
          type="text"
          id="last_name"
          required
        />
      </div>
      <div class="block">
        <label for="email">
          <el-text class="text" type="primary"> Email:</el-text>
        </label>
        <el-input v-model="user.email" type="email" id="email" required />
      </div>

      <el-button class="btn" type="primary" native-type="submit"
        >Save changes</el-button
      >
    </form>
  </div>

  <router-link :to="{ name: 'UserPanel' }">
    <el-button class="btn" type="info">Go to Home</el-button>
  </router-link>
</template>

<script setup lang="ts">
import { ElInput, ElText } from 'element-plus';
import { ref, onMounted, Ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { Store, useStore } from '../../node_modules/vuex';
import { State, User } from '../store';

const userId: Ref<number> = ref(0);
const user: Ref<User> = ref({
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
});

const store: Store<State> = useStore();

const parseUserId = (idParam: string | string[]): number => {
  return parseInt(Array.isArray(idParam) ? idParam[0] : idParam, 10);
};

const findUserById = (users: User[], id: number): User | undefined => {
  return users.find((u) => u.id === id);
};

const fetchUserFromApi = async (id: number): Promise<User | undefined> => {
  try {
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    return response.data.data as User;
  } catch (error) {
    console.error('Error fetching user:', error);
    return undefined;
  }
};

const saveChanges = async () => {
  try {
    await store.dispatch('updateUser', user.value);
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

onMounted(() => {
  const route = useRoute();
  userId.value = parseUserId(route.params.id);
  const selectedUser = findUserById(store.state.users, userId.value);

  if (selectedUser) {
    user.value = { ...selectedUser };
  } else {
    fetchUserFromApi(userId.value).then((userData) => {
      if (userData) {
        user.value = { ...userData };
      } else {
        console.error('User not found.');
      }
    });
  }
});
</script>

<style scoped>
.text {
  font-size: 24px;
}

.block {
  margin-top: 20px;
}

.btn {
  margin-top: 20px;
}
</style>
