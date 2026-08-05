<!-- views/HomeView.vue -->
<script setup>
const menu = [
  { to: '/weather/world', label: '🌇 세계 날씨' },
  { to: '/weather', label: '🌦️ 날씨 대시보드' },
  { to: '/about', label: 'ℹ️ 서비스 소개' },
  { to: '/practices/basic', label: '📘 실습 1: 기본 문법' },
  { to: '/practices/composition', label: '📗 실습 2: 컴포지션 & 컴포넌트' },
  { to: '/practices/store', label: '📙 실습 3: Store & Axios & UI & JavaScript' },
]
</script>

<!-- <template>
  <div class="home-container">
    <h1 class="title is-3">🏠 Vue 실습 홈</h1>
    <p class="subtitle is-6">아래 링크를 눌러 각 실습 화면으로 이동하세요.</p>
    <ul class="menu-list">
      <h3 v-for="item in menu" :key="item.to">
        <RouterLink class="button is-outlined is-fullwidth my-3" :to="item.to">{{ item.label }}</RouterLink>
      </h3>
    </ul>
  </div>
</template>
 -->

<template>
  <section class="section">
    <!-- 컨텐츠를 화면 중앙 영역으로 가두는 레이아웃 컨테이너 -->
    <div class="container is-max-desktop">
      <!-- 상단 타이틀 영역 (Hero 섹션 느낌) -->
      <div class="has-text-centered mb-6">
        <h1 class="title is-2">🏠 Vue 실습 홈</h1>
        <p class="subtitle is-5 has-text-grey">아래 링크를 눌러 각 실습 화면으로 이동하세요.</p>
      </div>

      <!-- 메인 메뉴 카드 및 그리드 레이아웃 -->
      <div class="columns is-centered">
        <div class="column is-8-tablet is-6-desktop">
          <div class="card">
            <div class="card-content">
              <div class="buttons">
                <RouterLink
                  v-for="item in menu"
                  :key="item.to"
                  :to="item.to"
                  class="button is-white is-fullwidth custom-menu-btn"
                >
                  <span>{{ item.label }}</span>
                  <b-icon icon="chevron-right" size="is-small"></b-icon>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.custom-menu-btn {
  justify-content: space-between;
  height: 3rem;
  font-size: 1.05rem;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 0;
}

.custom-menu-btn:last-child {
  border-bottom: none;
}

.custom-menu-btn:hover {
  background-color: #f9f9f9;
  color: #3273dc;
}
</style>
