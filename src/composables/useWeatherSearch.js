import { ref, computed, watch, watchEffect } from 'vue'

export function useWeatherSearch(initialList = []) {
  const weatherList = ref(initialList)
  // 검색어 및 알림창 제어용 데이터
  const searchQuery = ref('') 
  const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

  // computed를 활용한 실시간 검색 필터링 연산기 
  const filteredWeatherList = computed(() => {
    const query = searchQuery.value.trim()  // 앞뒤 공백을 제거합니다.
    if (!query) return weatherList.value  // 검색어가 비어있다면 원본 weatherList를 그대로 보여줍니다.
    return weatherList.value.filter((item) => item.name.includes(query))  // 검색어가 포함된 도시만 칼같이 필터링하여 실시간으로 뱉어냅니다.
  })

  // immediate 옵션이 포함된 watch
  // watch를 활용한 선택 도시 추적 센서
  watch(
    selectedCityInfo,
    (newInfo) => {
      console.log(`👁️‍🗨️ [watch 감지] 상태 바 문구가 업데이트되었습니다 -> "${newInfo}"`)
    },
    { immediate: true } // 컴포넌트가 마운트되는 즉시 콘솔에 초기값 로그 출력
  )
  // watchEffect를 활용한 자동 의존성 API 로그 시뮬레이션
  watchEffect(() => {
    console.log(`🤖 [watchEffect]  현재 검색어 '${searchQuery.value}'에 매칭되는 API 데이터를 필터링합니다.'`)
  })

  return {
    weatherList,
    searchQuery,
    selectedCityInfo,
    filteredWeatherList
  }
}