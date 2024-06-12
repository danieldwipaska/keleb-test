<template>
  <form @submit.prevent="submit" class="flex flex-col w-96 shadow-xl mt-20">
    <div class="flex flex-col items-center mt-8">
      <h1 class="text-xl font-bold">Please Register Before Login</h1>
    </div>
    <div class="flex flex-col mt-8 px-16">
      <div class="flex flex-col">
        <label for="name" class="text-black/70">Fullname</label>
        <input v-model="data.name" type="text" id="name" class="border-2 border-black/30 rounded-md px-4 py-2 mt-1" placeholder="Enter your fullname" />
      </div>
      <div class="flex flex-col mt-4">
        <label for="username" class="text-black/70">Username</label>
        <input v-model="data.username" type="text" id="username" class="border-2 border-black/30 rounded-md px-4 py-2 mt-1" placeholder="Enter your username" />
      </div>
      <div class="flex flex-col mt-4">
        <label for="password" class="text-black/70">Password</label>
        <input v-model="data.password" type="password" id="password" class="border-2 border-black/30 rounded-md px-4 py-2 mt-1" placeholder="Enter your password" />
      </div>
    </div>
    <p class="text-red-500 mt-2 px-16" v-if="isFailedRegister">Username Not Available</p>
    <div class="mt-8 px-16 mb-10">
      <button type="submit" class="w-full bg-black text-white rounded-md px-4 py-2 hover:bg-black/60 duration-300">Register</button>
    </div>
  </form>
</template>
<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const data = reactive({
      name: '',
      username: '',
      password: '',
    });

    const router = useRouter();

    const isFailedRegister = ref(false);

    const submit = async () => {
      console.log(data);
      try {
        const response = await fetch('http://localhost:3001/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to register');
        }

        router.push('/login');
      } catch (error) {
        console.log(error);
        isFailedRegister.value = true;
      }
    };

    return { data, submit, isFailedRegister };
  },
};
</script>
<style></style>
