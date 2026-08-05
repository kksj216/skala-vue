import { ref, computed, onMounted, onUnmounted, unref } from 'vue'
import { formatLocalTime } from '@/utils/weatherHelpers'

export function useLiveClock(timezoneOffsetSecRef) {
  const now = ref(new Date())
  let timerId = null

  const formattedTime = computed(() => {
    const offset = unref(timezoneOffsetSecRef)
    if (offset === undefined || offset === null) return '--:--'
    return formatLocalTime(offset, now.value)
  })

  onMounted(() => {
    timerId = setInterval(() => {
      now.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    if (timerId) clearInterval(timerId)
  })

  return { formattedTime }
}
