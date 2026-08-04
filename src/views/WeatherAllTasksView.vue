<!-- views/WeatherAllTasksView.vue -->
<script setup>
import WeatherMockup from '@/components/exercise/WeatherMockup.vue'
import WeatherComposition from '@/components/exercise/WeatherComposition.vue'
import WeatherParent from '@/components/exercise/WeatherParent.vue'
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <h1>⛅ 과제 1: 날씨 (Mockup)</h1>
    <hr />
    <WeatherMockup />
  </div>
  <div class="app-container">
    <h1>⛅ 과제 2: 날씨 (컴포지션)</h1>
    <hr />
    <WeatherComposition />
  </div>
  <div class="app-container">
    <h1>⛅ 과제 3: 날씨 (컴포넌트)</h1>
    <hr />
    <WeatherParent />
  </div>

  <!-- 과제 4: 라우터 실습 -->
  <div class="app-container">
    <h1>⛅ 과제 4: 라우터적용</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/weather" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/weather/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
      </nav>
      <main><RouterView /></main>
    </div>
  </div>

  <!-- 과제 5: 스토어 적용 -->
  <div class="app-container">
    <h1>⛅ 과제 5: 스토어적용</h1>
    <hr />
    <div class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/weather" class="nav-item">🌦️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/weather/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main><RouterView /></main>
    </div>
  </div>
</template>

<style scoped>
.weather-card-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2열 정렬 */
  gap: 24px;                                       /* 카드 간 간격 */
  max-width: 1200px;                               /* 컨테이너 최대 너비 지정 */
  margin: 0 auto;                                  /* 전체 레이아웃 화면 중앙 정렬 */
  padding: 20px;
}

/* 화면이 좁은 모바일 환경 대응 (선택 사항) */
@media (max-width: 768px) {
  .weather-card-container {
    grid-template-columns: 1fr;                    /* 모바일에서는 1열로 세로 정렬 */
  }
}
</style>