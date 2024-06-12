<template>
  <nav class="bg-black">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-stretch justify-start">
          <div class="ml-6 block">
            <div class="flex space-x-4">
              <router-link to="/" class="rounded-md px-3 py-2 text-sm font-medium text-white">Home</router-link>
            </div>
          </div>
        </div>
        <div class="flex flex-1 items-center justify-end">
          <div class="ml-6 block">
            <div class="flex space-x-4">
              <router-link to="/register" class="rounded-md px-3 py-2 text-sm font-medium text-white">Register</router-link>
            </div>
          </div>
          <div class="ml-6 block">
            <div class="flex space-x-4">
              <router-link to="/login" class="rounded-md px-3 py-2 text-sm font-medium text-white bg-slate-800">Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script></script>
<style></style>
