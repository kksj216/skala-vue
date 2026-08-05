import { ref, computed } from 'vue'
import { MAJOR_CITIES } from '@/constants/majorCities'
import { fetchWeatherByCityName } from '@/services/weatherApi'
import { getCustomCities } from '@/services/customCityStorage'

export function useWorldWeather() {
  const cities = ref([]) // 주요 도시 + 사용자가 추가한 커스텀 도시 카드 목록
  const isLoading = ref(false)
  const loadError = ref('')

  const searchQuery = ref('') // 목록 내 필터링 + 전역 검색 공용 입력값
  const searchResult = ref(null) // 목록에 없는 도시를 검색했을 때의 결과
  const isSearching = ref(false)
  const searchError = ref('')

  /** 주요 도시 + 저장된 커스텀 도시의 날씨를 병렬로 가져와 카드 목록을 채운다. */
  async function loadMajorCities() {
    isLoading.value = true
    loadError.value = ''
    try {
      const customMeta = getCustomCities()
      const allMeta = [...MAJOR_CITIES, ...customMeta]

      const settled = await Promise.allSettled(allMeta.map((city) => fetchWeatherByCityName(city.query)))

      cities.value = settled.map((result, idx) => {
        const meta = allMeta[idx]
        if (result.status === 'fulfilled') {
          return { ...meta, ...result.value, hasError: false }
        }
        console.error(`🔴 ${meta.name} 날씨 조회 실패:`, result.reason)
        return { ...meta, hasError: true }
      })
    } catch (err) {
      loadError.value = '날씨 정보를 불러오는 중 문제가 발생했습니다.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  /** 주요 도시 목록에서 이름으로 필터링 */
  const filteredCities = computed(() => {
    const q = searchQuery.value.trim()
    if (!q) return cities.value
    return cities.value.filter((c) => c.name.includes(q) || c.cityName?.toLowerCase().includes(q.toLowerCase()))
  })

  /** 목록에 없는 도시를 이름으로 검색 (예: '방콕', 'Bangkok') */
  async function searchCityByName(query) {
    const trimmed = query.trim()
    if (!trimmed) {
      searchResult.value = null
      searchError.value = ''
      return
    }
    isSearching.value = true
    searchError.value = ''
    try {
      searchResult.value = await fetchWeatherByCityName(trimmed)
    } catch {
      searchResult.value = null
      searchError.value = '해당 이름의 도시를 찾을 수 없습니다. 영문 도시명으로도 시도해보세요.'
    } finally {
      isSearching.value = false
    }
  }

  return {
    cities,
    filteredCities,
    isLoading,
    loadError,
    loadMajorCities,
    searchQuery,
    searchResult,
    isSearching,
    searchError,
    searchCityByName,
  }
}