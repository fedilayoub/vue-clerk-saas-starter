<template>
    <section class="container flex min-h-[100dvh] relative items-start pt-[20rem] justify-center bg-white px-4 dark:bg-black">
        <div class="absolute inset-0 blur-xl h-[580px]" :style="{
            background: 'linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(95, 251, 23, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)'
        }"></div>
        <div class="text-center">
            <h1 class="text-5xl font-bold mb-4 text-gray-700 dark:text-white">Page Not Found</h1>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Sorry, the page you are looking for does not exist.
            </p>
            <router-link to="/"
                class="flex items-center justify-center gap-x-1 py-3 px-4 text-black font-medium transform-gpu bg-accent rounded-full md:inline-flex cursor-pointer">
                Go to Homepage
            </router-link>
        </div>
    </section>
</template>
<script setup lang="ts" name="NotFound"></script>
