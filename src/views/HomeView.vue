<!-- views/HomeView.vue -->
<script setup>
const menu = [
  { to: '/weather', label: '🌦️ 날씨 대시보드' },
  { to: '/about', label: 'ℹ️ 서비스 소개' },
  { to: '/practices/basic', label: '📘 실습 1: 기본 문법' },
  { to: '/practices/composition', label: '📗 실습 2: 컴포지션 & 컴포넌트' },
  { to: '/practices/store', label: '📙 실습 3: Store & Axios ' },
]
</script>

<template>
  <div class="home-container">
    <h1>🏠 Vue 실습 홈</h1>
    <p>아래 링크를 눌러 각 실습 화면으로 이동하세요.</p>
    <ul class="menu-list">
      <h3 v-for="item in menu" :key="item.to">
        <RouterLink :to="item.to">{{ item.label }}</RouterLink>
      </h3>
    </ul>
  </div>
</template>