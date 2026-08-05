<script setup>
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <b-navbar fixed-top centered shadow class="home-navigation-bar">
    <!-- 
    <RouterLink to="/" class="nav-item">🏠 홈</RouterLink>
    <RouterLink to="/weather" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
    <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink> 
    -->
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        🏠 홈
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/weather' }">
        🌤️ 날씨 대시보드
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/about' }">
        ℹ️ 서비스 소개
      </b-navbar-item>
    </template>
  </b-navbar>
  <main>
    <RouterView />
  </main>
</template>

<style>
@import '@/assets/exercise.css';

#app {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  max-width: 100% !important;
}
</style>