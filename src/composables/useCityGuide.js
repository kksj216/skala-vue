import { ref, unref, watch, onMounted } from 'vue'
import { fetchCityGuide } from '@/services/wikivoyageApi'

export function useCityGuide(cityNameRef) {
  const guide = ref(null)
  const isLoading = ref(false)
  const error = ref('')

  async function load() {
    const name = unref(cityNameRef)
    if (!name) return

    isLoading.value = true
    error.value = ''
    try {
      guide.value = await fetchCityGuide(name)
    } catch (err) {
      guide.value = null
      error.value = '이 도시에 대한 여행 정보를 찾을 수 없습니다.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(load)
  watch(() => unref(cityNameRef), load)

  return { guide, isLoading, error }
}
