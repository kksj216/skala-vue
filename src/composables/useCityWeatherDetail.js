import { ref, unref, watch, onMounted } from 'vue'
import { fetchWeatherByCityName } from '@/services/weatherApi'

export function useCityWeatherDetail(cityQueryRef) {
  const weather = ref(null)
  const isLoading = ref(false)
  const error = ref('')

  async function load() {
    const query = unref(cityQueryRef)
    if (!query) return

    isLoading.value = true
    error.value = ''
    try {
      weather.value = await fetchWeatherByCityName(query)
    } catch (err) {
      weather.value = null
      error.value = '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(load)
  // cityQueryRef가 반응형 ref라면, 라우트 파라미터가 바뀔 때(다른 도시로 이동) 자동 재조회
  watch(() => unref(cityQueryRef), load)

  return { weather, isLoading, error, reload: load }
}
