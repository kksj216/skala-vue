<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="home-navigation-bar">
    <RouterLink to="/" class="nav-item">🏠 홈</RouterLink>
    <RouterLink to="/weather" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
    <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style>
@import '@/assets/exercise.css';
</style>