<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios' // 🟢 Axios 수입

import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const route = useRoute()

const latitude = ref(37.56)
const longitude = ref(127.0)
const weatherData = ref(null)

// 실제 외부 API 데이터를 받아와 채워줄 빈 반응형 배열과 로딩 상태 정의
const weatherList = ref([])
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const isLoading = ref(false)

// OpenWeatherMap 필수 연동 규격 정의
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const handleFetchWeather = async () => {
  if (!latitude.value || !longitude.value) {
    alert('위도와 경도를 모두 입력해 주세요.')
    return
  }

  isLoading.value = true

  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude.value}&lon=${longitude.value}&appid=${API_KEY}&units=metric&lang=kr`

  try {
    // 비동기 통신 가동: 서버에서 데이터를 다 가져올 때까지 await로 기다립니다.
    const response = await axios.get(URL)
    // fetch와 달리 .json() 변환 과정 없이 response.data에 알맹이가 즉시 담깁니다.
    console.log('Axios 통신 응답 전체 객체:', response)
    console.log('백엔드가 준 핵심 날씨 데이터(JSON):', response.data)
    weatherData.value = response.data
  } catch (error) {
    // 4xx, 5xx 에러나 네트워크 오프라인 시 자동으로 이 catch 영역으로 튕겨 들어옵니다.
    console.error('통신 중 에러가 발생했습니다:', error)
    alert('데이터를 가져오지 못했습니다. API 키 활성화 여부나 주소를 확인하세요.')
  } finally {
    isLoading.value = false
  }
}

// 🟢 [고도화] 3개 도시의 실제 실시간 데이터를 병렬로 긁어오는 비동기 파이프라인 함수
const fetchRealTimeWeather = async () => {
  isLoading.value = true
  try {
    const [seoulRes, suwonRes, busanRes, deaguRes, osakaRes] = await Promise.all([
      axios.get(`${BASE_URL}?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Suwon&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Busan&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=daegu&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=osaka&appid=${API_KEY}&units=metric&lang=kr`),
    ])

    // 기존 자식 컴포넌트(WeatherCard)가 요구하는 프로퍼티 규격에 맞춰 JSON 알맹이 맵핑
    weatherList.value = [
      {
        id: 'city_01',
        name: '서울',
        temp: seoulRes.data.main.temp,
        status: seoulRes.data.weather[0].description,
      },
      {
        id: 'city_02',
        name: '수원',
        temp: suwonRes.data.main.temp,
        status: suwonRes.data.weather[0].description,
      },
      {
        id: 'city_03',
        name: '부산',
        temp: busanRes.data.main.temp,
        status: busanRes.data.weather[0].description,
      },
      {
        id: 'city_04',
        name: '대구',
        temp: deaguRes.data.main.temp,
        status: deaguRes.data.weather[0].description,
      },
      {
        id: 'city_04',
        name: '오사카',
        temp: osakaRes.data.main.temp,
        status: osakaRes.data.weather[0].description,
      },
    ]
    console.log('🟢 [API 통신 완료] 메인 대시보드 실시간 기상 장부 동기화:', weatherList.value)
  } catch (error) {
    console.error('🔴 날씨 API 연동 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// 초기 마운트 시 주소창의 쿼리(?search=) 스트링 읽어서 상태 복원 + 실시간 API 통신 가동
onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  // 🟢 [고도화] 컴포넌트 장착 직후 기상청 실시간 데이터를 호출합니다.
  fetchRealTimeWeather()
})

// 타이핑될 때마다 주소창의 쿼리 스트링 값을 실시간 푸시 개편 (기존 로직 유지)
watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

// 자식 카드 컴포넌트의 상세보기 신호를 받으면 해당 ID 주소로 라우터 점프 실행 (기존 로직 유지)
const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <p>🔍 위도(lat), 경도(lon)로 날씨 검색 하기</p>
      <div class="input-group">
        <label>
          위도(lat):
          <BInput type="number" step="any" v-model.number="latitude" placeholder="예: 37.56" />
        </label>
        <label>
          경도(lon):
          <BInput type="number" step="any" v-model.number="longitude" placeholder="예: 127.00" />
        </label>
      </div>

      <button class="button is-primary is-light" @click="handleFetchWeather" :disabled="isLoading">
        {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 당겨오기' }}
      </button>

      <div v-if="weatherData" class="weather-card">
        <p>
          📍 위치: <strong>{{ weatherData.name }}</strong>
        </p>
        <p>
          🌡️ 현재 기온: <strong>{{ weatherData.main.temp }}°C</strong> (정상 섭씨 변환 완료)
        </p>
        <p>
          ☁️ 날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong>
        </p>
        <p>
          💧 습도: <strong>{{ weatherData.main.humidity }}%</strong>
        </p>
      </div>
      <div v-else>
        <p>아직 가져온 데이터가 없습니다. 버튼을 눌러 통신을 가동하세요.</p>
      </div>
    </BaseDashboardCard>

    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황 (실시간 기상청 연동)</h3>

      <p
        v-if="isLoading"
        style="text-align: center; color: #3498db; font-weight: bold; padding: 20px 0"
      >
        🔄 글로벌 기상 위성으로부터 실시간 기상 데이터를 수신 중입니다...
      </p>

      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="(msg) => (selectedCityInfo = msg)"
          @click-detail="handleDetailJump(item.id)"
        />

        <p
          v-if="filteredWeatherList.length === 0"
          style="text-align: center; color: #e74c3c; padding: 10px 0"
        >
          😭 검색 결과와 일치하는 도시가 없습니다.
        </p>
      </template>
    </BaseDashboardCard>
    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.status-bar {
  background: #e8f5e9;
  padding: 10px;
  text-align: center;
  color: #2e7d32;
  font-weight: bold;
  border-radius: 6px;
}
</style>
