<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const route = useRoute()

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

onMounted(() => {
    if (route.query.search) {
        searchQuery.value = route.query.search
    }
})

watch(searchQuery, (newQuery) => {
    router.push({
        path: route.path,
        query: {search: newQuery || undefined}
    })
})

const filteredWeatherList = computed(() => {
    const query = searchQuery.value.trim()
    if (!query) return weatherList.value
    return weatherList.value.filter((item) => item.name.includes(query))
})

const handleDetailJump = (id) => {
    router.push(`/weather/${id}`)
}
</script>

<template>
    <div class="dashboard-wrapper">
        <BaseDashboardCard>
        <SearchBar 
            :current-query="searchQuery" 
            @update-query="(val) => (searchQuery = val)" 
        />
        <!-- :current-query="searchQuery" : 부모의 searchQuery 값을 자식의 currentQuery prop으로 전달 -->
        <!-- @update-query= 자식의 update-query 이벤트를 받음 -> searchQuery 갱신 -->
        </BaseDashboardCard>

        <BaseDashboardCard>
        <h3>🏙️ 지역별 날씨 현황</h3>
        <WeatherCard 
            v-for="item in filteredWeatherList" :key="item.id" 
            :city-item="item" 
            @select-card="(msg) => (selectedCityInfo = msg)" 
            @click-detail="handleDetailJump(item.id)" 
        /> 
        <!-- :city-item="item" : 부모의 item 객체를 자식의 city-item prop 으로 전달 -->
        <!-- @select-card= 자식의 select-card 이벤트를 받음 -> 상태 메시지를 바꿈 -->
        <!-- @click-detail= 자식의 click-detail 이벤트를 받음 -> 라우터 상세 페이지로 이동 -->
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