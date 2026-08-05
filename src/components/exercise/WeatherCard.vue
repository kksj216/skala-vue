<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'

// 1. 상위로부터 단방향 주입받을 객체 데이터 규격 검수 (매크로)
const props = defineProps({
    cityItem: {
        type: Object,
        required: true,
    },
})

// 2. 상위로 송신할 두 가지 경로의 커스텀 이벤트 식별자 등록 (매크로)
const emit = defineEmits(['select-card', 'click-detail'])

// Config 스토어 호출
const configStore = useConfigStore()

// 화씨/섭씨 실시간 변환 연산자(computed) 등록
const displayTemp = computed(() => {
  if (!props.cityItem || props.cityItem.temp === undefined) return 0
  const rawTemp = props.cityItem.temp // 원본 섭씨 온도

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환
  }
  return rawTemp // 섭씨
})
</script>

<template>
    <div class="weather-card" @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
        <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>
        <!-- <p>현재 기온: {{ cityItem.temp }}°C</p> -->
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

        <!-- 날씨 상태에 따른 배지 표시 (쾌적함 추가) -->
        <span v-if="cityItem.temp >= 25" class="badge hot">🔥 더움</span>
        <span v-else-if="cityItem.temp >= 18" class="badge mild">🌤️ 쾌적함</span>
        <span v-else class="badge cool">❄️ 선선함</span>
        
        <!-- Scoped Slot: 자식의 데이터를 부모(WeatherParent)에게 바인딩하여 전달 -->
        <slot name="action" :item="cityItem">
          <b-button class="btn-detail" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
            상세보기
          </b-button>
        </slot>

    </div>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border: 1px solid #dee2e6;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
}
.badge {
  display: inline-block;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
}
.hot {
  background-color: #ff7675;
}
.cool {
  background-color: #74b9ff;
}
.btn-detail {
  position: absolute;
  right: 12px;
  top: 15px;
  padding: 6px 10px;
  cursor: pointer;
}
</style>