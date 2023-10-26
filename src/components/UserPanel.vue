<template>
  <div class="user-list">
    <el-col v-for="user in users" :key="user.id">
      <el-card class="user-card">
        <div slot="header" class="user-card-header">
          {{ user.first_name }} {{ user.last_name }}
        </div>
        <div class="user-details">
          <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
        <router-link
          class="view-profile-btn"
          :to="{ name: 'userProfile', params: { id: user.id } }"
        >
          <el-button type="primary">View Profile</el-button>
        </router-link>
      </el-card>
    </el-col>
  </div>
</template>

<script setup lang="ts">
import { ElCol, ElCard, ElButton } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useStore } from '../../node_modules/vuex';
import { User } from '../store';

const users = ref<User[]>([]);

onMounted(async () => {
  const store = useStore();

  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users.value = JSON.parse(storedUsers);
  } else {
    await store.dispatch('fetchUsers');
    users.value = store.state.users;
    localStorage.setItem('users', JSON.stringify(store.state.users));
  }
});
</script>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-card {
  width: 300px;
  margin-bottom: 50px;
  background: #e7e5e5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-card:hover {
  box-shadow: none;
}

.user-card-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-details {
  display: flex;
  align-items: center;
  justify-content: center;
}

.view-profile-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}
</style>
