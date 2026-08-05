<script setup>
defineProps({
  guide: { type: Object, default: null },
  isLoading: { type: Boolean, default: false },
  error: { type: String, default: '' },
})
</script>

<template>
  <section class="city-guide">
    <h4>📖 도시 여행 정보 <span class="source">(Wikivoyage)</span></h4>

    <p v-if="isLoading" class="status">불러오는 중…</p>
    <p v-else-if="error" class="status error">{{ error }}</p>

    <div v-else-if="guide" class="guide-body">
      <img v-if="guide.thumbnailUrl" class="thumb" :src="guide.thumbnailUrl" :alt="guide.title" />
      <div class="guide-text">
        <p class="extract">{{ guide.extract }}</p>
        <a class="more-link" :href="guide.pageUrl" target="_blank" rel="noopener">Wikivoyage에서 더 보기 →</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.city-guide {
  background: #fff;
  border: 1px solid #e6e9f0;
  border-radius: 16px;
  padding: 18px 20px;
}

h4 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #4a5170;
  margin-bottom: 12px;
}

.source {
  font-weight: 400;
  color: #8a91a8;
  font-size: 0.8rem;
}

.status {
  color: #8a91a8;
  font-size: 0.9rem;
  padding: 10px 0;
}

.status.error {
  color: #e0574c;
}

.guide-body {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.thumb {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.guide-text {
  flex: 1;
  min-width: 200px;
}

.extract {
  font-size: 0.9rem;
  color: #2c3457;
  line-height: 1.6;
}

.more-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 0.85rem;
  color: #3563e9;
  font-weight: 600;
  text-decoration: none;
}

.more-link:hover {
  text-decoration: underline;
}
</style>
