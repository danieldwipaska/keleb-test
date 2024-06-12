<template>
  <div class="flex flex-col items-center">
    <p class="mt-8">{{ message }}</p>
    <button @click="isLogged ? logout() : login()" class="mt-4 bg-black text-white rounded-md px-4 py-2 hover:bg-black/60 duration-300">{{ isLogged ? 'Logout' : 'Login' }}</button>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const message = ref('');
    const isLogged = ref(false);

    const router = useRouter();

    onMounted(async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/verify', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const responseData = await response.json();

        message.value = `Hi, ${responseData.data.name}!`;
        isLogged.value = true;
      } catch (error) {
        console.log(error);
        message.value = 'You are not logged in. Please login first';
        isLogged.value = false;
      }
    });

    const logout = () => {
      localStorage.removeItem('token');
      location.reload();
    };

    const login = () => {
      router.push('/login');
    };

    return { message, isLogged, logout, login };
  },
};
</script>
<style></style>
