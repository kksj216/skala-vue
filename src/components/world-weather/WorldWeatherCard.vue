<script setup>
import { computed } from 'vue'
import { useLiveClock } from '@/composables/useLiveClock'
import { getEncouragementMessage } from '@/utils/weatherHelpers'
import { getWeatherIconUrl } from '@/services/weatherApi'

const props = defineProps({
  city: { type: Object, required: true },
  showAddButton: { type: Boolean, default: false }, // 검색 결과 카드에서 "주요 도시에 추가" 버튼 노출
  showRemoveButton: { type: Boolean, default: false }, // 사용자가 추가한 커스텀 도시 카드에서 삭제 버튼 노출
})

const emit = defineEmits(['select', 'add', 'remove'])

const timezoneOffset = computed(() => props.city.timezoneOffsetSec)
const { formattedTime } = useLiveClock(timezoneOffset)

const encouragement = computed(() => {
  if (props.city.hasError || props.city.tempCelsius === undefined) return null
  return getEncouragementMessage(props.city.tempCelsius, props.city.main)
})
</script>

<template>
  <article class="weather-card" :class="{ 'is-error': city.hasError }">
    <template v-if="city.hasError">
      <p class="error-text">⚠️ {{ city.name }} 날씨를 불러오지 못했어요.</p>
    </template>

    <template v-else>
      <button
        v-if="showRemoveButton"
        class="remove-btn"
        title="목록에서 삭제"
        @click.stop="emit('remove', city.id)"
      >
        ✕
      </button>

      <div class="clickable-area" @click="emit('select', city)">
        <header class="card-top">
          <div class="city-name">
            <span class="flag">{{ city.flag }}</span>
            <h3>{{ city.name }}</h3>
          </div>
          <span class="local-time">🕒 {{ formattedTime }}</span>
        </header>

        <div class="card-main">
          <img
            v-if="city.icon"
            class="weather-icon"
            :src="getWeatherIconUrl(city.icon)"
            :alt="city.description"
          />
          <div class="temp-block">
            <span class="temp">{{ Math.round(city.tempCelsius) }}°</span>
            <span class="desc">{{ city.description }}</span>
          </div>
        </div>

        <p v-if="encouragement" class="encouragement">
          {{ encouragement.emoji }} {{ encouragement.message }}
        </p>

        <footer class="card-footer">
          <span class="detail-link">상세보기 →</span>
        </footer>
      </div>

      <button v-if="showAddButton" class="add-btn" @click.stop="emit('add')">
        + 주요 도시에 추가
      </button>
    </template>
  </article>
</template>

<style scoped>
.weather-card {
  background: #fff;
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 6px 20px rgba(30, 40, 70, 0.07);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.weather-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(30, 40, 70, 0.12);
}

.weather-card.is-error {
  cursor: default;
  background: #fff5f5;
}

.error-text {
  color: #e0574c;
  font-size: 0.9rem;
  text-align: center;
  padding: 20px 0;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.city-name {
  display: flex;
  align-items: center;
  gap: 6px;
}

.city-name h3 {
  font-size: 1.05rem;
  font-weight: 700;
  color: #22293b;
}

.flag {
  font-size: 1.1rem;
}

.local-time {
  font-size: 0.8rem;
  color: #8a91a8;
  font-variant-numeric: tabular-nums;
}

.card-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.weather-icon {
  width: 52px;
  height: 52px;
  margin-left: -8px;
}

.temp-block {
  display: flex;
  flex-direction: column;
}

.temp {
  font-size: 2rem;
  font-weight: 700;
  color: #22293b;
  line-height: 1;
}

.desc {
  font-size: 0.85rem;
  color: #8a91a8;
  margin-top: 2px;
}

.encouragement {
  font-size: 0.82rem;
  color: #3563e9;
  background: #eef3ff;
  border-radius: 10px;
  padding: 8px 10px;
  line-height: 1.4;
}

.card-footer {
  text-align: right;
}

.detail-link {
  font-size: 0.8rem;
  color: #4f8bff;
  font-weight: 600;
}
</style>
