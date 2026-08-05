<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}

const features = [
  { icon: '🌍', title: '세계 날씨 대시보드', desc: '주요 도시의 실시간 기온, 날씨 상태, 현지 시각을 카드 형태로 한눈에 확인합니다.' },
  { icon: '🔎', title: '도시 검색 & 추가', desc: '원하는 도시를 이름으로 검색하고, 마음에 들면 주요 도시 목록에 저장할 수 있습니다.' },
  { icon: '📊', title: '상세 기상 정보', desc: '체감 온도, 습도, 풍속, 일출·일몰 시각 등 상세한 기상 데이터를 제공합니다.' },
  { icon: '📍', title: '위치 시각화', desc: '지도 위에서 도시의 실제 위치를 직접 확인할 수 있습니다.' },
  { icon: '📖', title: '도시 여행 정보', desc: 'Wikivoyage 데이터를 연동해 도시에 대한 간단한 여행 소개글을 함께 보여줍니다.' },
  { icon: '💌', title: '오늘의 응원 멘트', desc: '현재 온도와 날씨 상태에 맞춰 하루를 응원하는 짧은 문장을 전달합니다.' },
]

const techStack = [
  { name: 'Vue 3 (Composition API)', role: '반응형 UI 및 컴포넌트 구성' },
  { name: 'Vue Router 4', role: '화면 간 라우팅 및 상세보기 네비게이션' },
  { name: 'Pinia', role: '전역 상태 관리 (온도 단위 등)' },
  { name: 'Axios', role: 'OpenWeatherMap API 통신' },
  { name: 'OpenWeatherMap API', role: '실시간 날씨 데이터 제공' },
  { name: 'Wikivoyage REST API', role: '도시 여행 정보 제공' },
]
</script>

<template>
  <div class="about-page">
    <header class="hero">
      <h2>ℹ️ 서비스 소개</h2>
      <p class="lead">
        <strong>Vue 3</strong>와 <strong>Vue Router 4</strong> 기반으로 제작된 실습용 기상 관측 대시보드이자,
        전 세계 주요 도시의 날씨와 여행 정보를 한 화면에서 확인할 수 있는 서비스입니다.
      </p>
    </header>

    <section class="section">
      <h3>✨ 주요 기능</h3>
      <div class="feature-grid">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <span class="feature-icon">{{ f.icon }}</span>
          <h4>{{ f.title }}</h4>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h3>🛠️ 사용 기술</h3>
      <ul class="tech-list">
        <li v-for="t in techStack" :key="t.name">
          <span class="tech-name">{{ t.name }}</span>
          <span class="tech-role">{{ t.role }}</span>
        </li>
      </ul>
    </section>

    <section class="section">
      <h3>🧱 아키텍처 원칙</h3>
      <div class="description-box">
        <ul>
          <li><code>services/</code> — 외부 API(OpenWeather, Wikivoyage) 호출만 담당하는 순수 함수 계층</li>
          <li><code>composables/</code> — 화면 상태와 흐름을 관리하는 비즈니스 로직 계층</li>
          <li><code>components/</code> — props/emit으로만 동작하는 순수 UI 계층</li>
          <li><code>views/</code> — 위 계층들을 조립해 하나의 화면으로 구성</li>
        </ul>
      </div>
    </section>

    <button class="home-btn" @click="handleGoHome">대시보드 홈으로 이동</button>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.hero {
  background: linear-gradient(135deg, #4f8bff, #3563e9);
  color: #fff;
  border-radius: 20px;
  padding: 28px 30px;
}

.hero h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 10px;
}

.hero .lead {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.95;
}

.section h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #22293b;
  margin-bottom: 14px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 14px;
}

.feature-card {
  background: #fff;
  border: 1px solid #e6e9f0;
  border-radius: 16px;
  padding: 16px 18px;
}

.feature-icon {
  font-size: 1.6rem;
}

.feature-card h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #22293b;
  margin: 8px 0 6px;
}

.feature-card p {
  font-size: 0.85rem;
  color: #6c7386;
  line-height: 1.55;
}

.tech-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tech-list li {
  display: flex;
  justify-content: space-between;
  background: #f8f9fc;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.88rem;
}

.tech-name {
  font-weight: 700;
  color: #22293b;
}

.tech-role {
  color: #8a91a8;
}

.description-box {
  background: #f8f9fa;
  padding: 14px 16px;
  border-radius: 12px;
  line-height: 1.6;
  font-size: 14px;
}

.description-box ul {
  padding-left: 20px;
  margin: 0;
}

.description-box li {
  margin-bottom: 8px;
  color: #555;
}

code {
  background: #ffeaa7;
  padding: 2px 5px;
  border-radius: 4px;
  color: #d63031;
  font-size: 0.85em;
}

.home-btn {
  align-self: flex-start;
  padding: 12px 24px;
  background: linear-gradient(135deg, #4f8bff, #3563e9);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.9rem;
}

.home-btn:hover {
  opacity: 0.92;
}
</style>
