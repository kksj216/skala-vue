<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  isSearching: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'search'])

const handleSubmit = (event) => {
  emit('search', event.target.elements.cityQuery.value)
}
</script>

<template>
  <form class="search-bar" @submit.prevent="handleSubmit">
    <span class="icon">🔍</span>
    <input
      name="cityQuery"
      type="text"
      class="search-input"
      :value="modelValue"
      placeholder="도시 영어 이름으로 검색 (예: Bangkok)"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <p>입력 후, '검색' 버튼을 클릭하세요. 👉</p>
    <button type="submit" class="search-btn" :disabled="isSearching">
      {{ isSearching ? '검색 중…' : '검색' }}
    </button>
  </form>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #e6e9f0;
  border-radius: 999px;
  padding: 8px 10px 8px 18px;
  box-shadow: 0 2px 10px rgba(30, 40, 70, 0.05);
}

.icon {
  font-size: 1.05rem;
  opacity: 0.6;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  background: transparent;
}

.search-btn {
  border: none;
  border-radius: 999px;
  padding: 9px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #4f8bff, #3563e9);
  cursor: pointer;
  transition: transform 0.12s ease, opacity 0.12s ease;
  white-space: nowrap;
}

.search-btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: default;
}
</style>
