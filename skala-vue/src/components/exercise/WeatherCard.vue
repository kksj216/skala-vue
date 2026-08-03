<script setup>
import { ref } from 'vue'

const weatherList = ref ([
    {id: 'city_01', name: '서울', temp: 28, status: '맑음'},
    {id: 'city_02', name: '수원', temp: 24, status: '비'},
    {id: 'city_03', name: '부산', temp: 26, status: '구름'},
])

// 검색어 및 알림창 제어용 데이터 (v-model 대용 한글 처리 및 이벤트 실습용)
const searchQuery = ref('')
const selectedCirtInfo = ref('카드를 클릭하거나 검색해 보세요.')

// 알림 대행 함수 (window 객체 격리 우회)
const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 현재 날씨는 [${status}]입니다.`)
}

</script>

<template>
    <div class="dashboard-wrapper">
        <section class="search-box">
            <h3>🔍 도시 검색</h3>
        </section>
    </div>

</template>