<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWorldWeather } from '@/composables/useWorldWeather'
import WorldWeatherSearchBar from '@/components/world-weather/WorldWeatherSearchBar.vue'
import WorldWeatherCard from '@/components/world-weather/WorldWeatherCard.vue'

const router = useRouter()

const {
  filteredCities,
  isLoading,
  loadError,
  loadMajorCities,
  searchQuery,
  searchResult,
  isSearching,
  searchError,
  searchCityByName,
} = useWorldWeather()

onMounted(loadMajorCities)

// 카드 클릭 -> 상세보기 라우트로 이동. query 값(예: 'Seoul,KR')을 그대로 경로 파라미터로 사용한다.
const goToDetail = (city) => {
  const cityQuery = city.query ?? `${city.cityName},${city.country}`
  router.push({ name: 'WorldWeatherDetail', params: { cityQuery: encodeURIComponent(cityQuery) } })
}

const handleSearch = (value) => {
  searchQuery.value = value
  // 주요 도시 목록에 없는 이름이면 OpenWeather에 직접 물어본다.
  searchCityByName(value)
}
</script>

<template>
  <div class="world-weather">
    <header class="page-header">
      <h2>🌍 세계 날씨</h2>
      <p class="subtitle">주요 도시의 실시간 날씨와 현지 시각을 한눈에 확인하세요.</p>
    </header>

    <WorldWeatherSearchBar v-model="searchQuery" :is-searching="isSearching" @search="handleSearch" />

    <p v-if="searchError" class="search-error">😕 {{ searchError }}</p>

    <!-- 검색으로 새로 찾은 도시가 있으면 상단에 별도로 보여준다 -->
    <section v-if="searchResult" class="search-result-section">
      <h4>🔎 검색 결과</h4>
      <div class="grid single">
        <WorldWeatherCard :city="{ ...searchResult, name: searchResult.cityName, flag: '📍' }" @select="goToDetail" />
      </div>
    </section>

    <section class="major-cities-section">
      <h4>🏙️ 주요 도시</h4>

      <p v-if="isLoading" class="loading-text">🔄 전 세계 날씨 데이터를 불러오는 중입니다…</p>
      <p v-else-if="loadError" class="loading-text error">⚠️ {{ loadError }}</p>

      <div v-else class="grid">
        <WorldWeatherCard v-for="city in filteredCities" :key="city.id" :city="city" @select="goToDetail" />
        <p v-if="filteredCities.length === 0" class="empty-text">일치하는 도시가 없습니다. 검색 버튼으로 다른 도시를 찾아보세요.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.world-weather {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.page-header h2 {
  font-size: 1.6rem;
  font-weight: 800;
  color: #22293b;
}

.subtitle {
  color: #8a91a8;
  font-size: 0.9rem;
  margin-top: 4px;
}

h4 {
  font-size: 1rem;
  font-weight: 700;
  color: #4a5170;
  margin-bottom: 12px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 16px;
}

.grid.single {
  grid-template-columns: minmax(230px, 320px);
}

.loading-text {
  text-align: center;
  color: #4f8bff;
  font-weight: 600;
  padding: 30px 0;
}

.loading-text.error {
  color: #e0574c;
}

.empty-text {
  grid-column: 1 / -1;
  text-align: center;
  color: #e0574c;
  padding: 20px 0;
}

.search-error {
  color: #e0574c;
  font-size: 0.85rem;
  margin: -8px 0 0 4px;
}
</style>
