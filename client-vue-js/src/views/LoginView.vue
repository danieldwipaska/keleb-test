<template>
  <form @submit.prevent="submit" class="flex flex-col w-96 shadow-xl mt-20">
    <div class="flex flex-col items-center mt-8">
      <h1 class="text-2xl font-bold">Please login first</h1>
    </div>
    <div class="flex flex-col mt-8 px-16">
      <div class="flex flex-col">
        <label for="username" class="text-black/70">Username</label>
        <input v-model="data.username" type="text" id="username" class="border-2 border-black/30 rounded-md px-4 py-2 mt-1" placeholder="Enter your username" />
      </div>
      <div class="flex flex-col mt-4">
        <label for="password" class="text-black/70">Password</label>
        <input v-model="data.password" type="password" id="password" class="border-2 border-black/30 rounded-md px-4 py-2 mt-1" placeholder="Enter your password" />
      </div>
    </div>
    <p class="text-red-500 mt-2 px-16" v-if="isFailedLogin">Wrong Credentials!</p>
    <div class="mt-8 px-16 mb-10">
      <button type="submit" class="w-full bg-black text-white rounded-md px-4 py-2 hover:bg-black/60 duration-300">Login</button>
    </div>
  </form>
</template>
<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const data = reactive({
      username: '',
      password: '',
    });

    const router = useRouter();

    const isFailedLogin = ref(false);

    const submit = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to login');
        }

        // send the JWT to local storage
        const { accessToken } = await response.json();
        localStorage.setItem('token', accessToken);

        router.push('/');
      } catch (error) {
        console.log(error);
        isFailedLogin.value = true;
      }
    };

    return { data, submit, isFailedLogin };
  },
};
</script>
<style></style>
