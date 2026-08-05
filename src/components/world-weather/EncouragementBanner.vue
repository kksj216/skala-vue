<script setup>
import { computed } from 'vue'
import { getEncouragementMessage } from '@/utils/weatherHelpers'

const props = defineProps({
  tempCelsius: { type: Number, required: true },
  main: { type: String, default: '' },
})

const encouragement = computed(() => getEncouragementMessage(props.tempCelsius, props.main))
</script>

<template>
  <div class="encouragement-banner">
    <span class="emoji">{{ encouragement.emoji }}</span>
    <p>{{ encouragement.message }}</p>
  </div>
</template>

<style scoped>
.encouragement-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #eef3ff, #f5f8ff);
  border: 1px solid #dfe8ff;
  border-radius: 16px;
  padding: 16px 18px;
}

.emoji {
  font-size: 1.8rem;
}

.encouragement-banner p {
  font-size: 0.95rem;
  color: #2c3457;
  line-height: 1.5;
  margin: 0;
}
</style>
