<script setup>
import { ref } from 'vue'

// 상위 컴포넌트로 데이터를 보내기 위한 emit 정의
const emit = defineEmits(['add-city'])

// 입력 폼 상태 데이터
const cityName = ref('')
const temp = ref(20)
const status = ref('맑음')
const errorMessage = ref('')

// 도시 추가 제출 핸들러
const handleSubmit = () => {
  // 간단한 Validation (공백 검사)
  if (!cityName.value.trim()) {
    errorMessage.value = '도시 이름을 입력해주세요!'
    return
  }

  // 유효성 검사 통과 시 에러 메시지 초기화
  errorMessage.value = ''

  // 부모 컴포넌트로 새 도시 객체 전달
  emit('add-city', {
    id: `city_${Date.now()}`, // 고유 키 생성
    name: cityName.value.trim(),
    temp: Number(temp.value),
    status: status.value
  })

  // 폼 초기화
  cityName.value = ''
  temp.value = 20
  status.value = '맑음'
}
</script>

<template>
  <div class="add-city-form">
    <h4>➕ 새로운 도시 추가</h4>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>도시명:</label>
        <input 
          type="text" 
          v-model.trim="cityName" 
          placeholder="예: 대구" 
        />
      </div>

      <div class="form-group">
        <label>기온 (°C):</label>
        <input 
          type="number" 
          v-model.number="temp" 
        />
      </div>

      <div class="form-group">
        <label>날씨 상태:</label>
        <select v-model="status">
          <option value="맑음">맑음</option>
          <option value="구름">구름</option>
          <option value="비">비</option>
          <option value="눈">눈</option>
        </select>
      </div>

      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

      <button type="submit" class="btn-add">도시 등록</button>
    </form>
  </div>
</template>

<style scoped>
.add-city-form {
  background: lab(68.76% -2.6 -10.82);
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 15px;
}
.form-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.error-msg {
  color: #e74c3c;
  font-size: 13px;
  margin: 4px 0;
}
.btn-add {
  background: lab(24.01% -5.64 -19.44);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>