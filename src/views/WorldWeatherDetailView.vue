<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCityWeatherDetail } from '@/composables/useCityWeatherDetail'
import { useLiveClock } from '@/composables/useLiveClock'
import { useCityGuide } from '@/composables/useCityGuide'
import { getWeatherIconUrl } from '@/services/weatherApi'
import { formatUnixToLocalTime } from '@/utils/weatherHelpers'
import EncouragementBanner from '@/components/world-weather/EncouragementBanner.vue'
import WorldWeatherMap from '@/components/world-weather/WorldWeatherMap.vue'
import CityGuideCard from '@/components/world-weather/CityGuideCard.vue'

const route = useRoute()
const router = useRouter()

// 라우트 파라미터(:cityQuery)는 encodeURIComponent로 인코딩되어 들어오므로 복원한다.
const cityQuery = computed(() => decodeURIComponent(route.params.cityQuery ?? ''))

const { weather, isLoading, error } = useCityWeatherDetail(cityQuery)

const timezoneOffset = computed(() => weather.value?.timezoneOffsetSec)
const { formattedTime } = useLiveClock(timezoneOffset)

const sunriseText = computed(() =>
  weather.value ? formatUnixToLocalTime(weather.value.sunrise, weather.value.timezoneOffsetSec) : '',
)
const sunsetText = computed(() =>
  weather.value ? formatUnixToLocalTime(weather.value.sunset, weather.value.timezoneOffsetSec) : '',
)

// Wikivoyage는 영문 도시명 기준으로 검색이 잘 되므로 OpenWeather가 준 영문 cityName을 그대로 사용한다.
const cityNameForGuide = computed(() => weather.value?.cityName ?? '')
const { guide, isLoading: isGuideLoading, error: guideError } = useCityGuide(cityNameForGuide)
</script>

<template>
  <div class="detail-view">
    <button class="back-btn" @click="router.push({ name: 'WorldWeatherHome' })">← 세계 날씨 목록으로</button>

    <p v-if="isLoading" class="status-text">🔄 상세 날씨 정보를 불러오는 중입니다…</p>
    <p v-else-if="error" class="status-text error">⚠️ {{ error }}</p>

    <template v-else-if="weather">
      <header class="hero">
        <div class="hero-main">
          <img :src="getWeatherIconUrl(weather.icon)" :alt="weather.description" class="hero-icon" />
          <div>
            <h2>{{ weather.cityName }}, {{ weather.country }}</h2>
            <p class="local-time">🕒 현지 시각 {{ formattedTime }}</p>
          </div>
        </div>
        <div class="hero-temp">
          <span class="temp">{{ Math.round(weather.tempCelsius) }}°C</span>
          <span class="desc">{{ weather.description }}</span>
        </div>
      </header>

      <EncouragementBanner :temp-celsius="weather.tempCelsius" :main="weather.main" />

      <section class="stats-grid">
        <div class="stat-card">
          <span class="label">체감 온도</span>
          <span class="value">{{ Math.round(weather.feelsLike) }}°C</span>
        </div>
        <div class="stat-card">
          <span class="label">습도</span>
          <span class="value">{{ weather.humidity }}%</span>
        </div>
        <div class="stat-card">
          <span class="label">풍속</span>
          <span class="value">{{ weather.windSpeed }} m/s</span>
        </div>
        <div class="stat-card">
          <span class="label">일출 / 일몰</span>
          <span class="value small">{{ sunriseText }} / {{ sunsetText }}</span>
        </div>
      </section>

      <!-- 🌍 날씨 정보와 위치(지도) 사이에 Wikivoyage 도시 여행 정보를 배치 -->
      <CityGuideCard :guide="guide" :is-loading="isGuideLoading" :error="guideError" />

      <section>
        <h4>📍 위치</h4>
        <WorldWeatherMap :lat="weather.coord.lat" :lon="weather.coord.lon" :city-name="weather.cityName" />
      </section>
    </template>
  </div>
</template>

<style scoped>
.detail-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back-btn {
  align-self: flex-start;
  border: none;
  background: none;
  color: #4f8bff;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 4px 0;
}

.status-text {
  text-align: center;
  color: #4f8bff;
  font-weight: 600;
  padding: 40px 0;
}

.status-text.error {
  color: #e0574c;
}

.hero {
  background: linear-gradient(135deg, #4f8bff, #3563e9);
  color: #fff;
  border-radius: 20px;
  padding: 24px 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.hero-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-icon {
  width: 64px;
  height: 64px;
}

.hero h2 {
  font-size: 1.3rem;
  font-weight: 800;
}

.local-time {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 2px;
}

.hero-temp {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.hero-temp .temp {
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1;
}

.hero-temp .desc {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 4px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 14px;
}

.stat-card {
  background: #fff;
  border: 1px solid #e6e9f0;
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-card .label {
  font-size: 0.8rem;
  color: #8a91a8;
}

.stat-card .value {
  font-size: 1.15rem;
  font-weight: 700;
  color: #22293b;
}

.stat-card .value.small {
  font-size: 0.95rem;
}

h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #4a5170;
  margin-bottom: 10px;
}
</style>
