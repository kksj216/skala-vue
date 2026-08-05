<script setup>
import { computed } from 'vue'

const props = defineProps({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  cityName: { type: String, default: '' },
})

// 지도에 보여줄 영역(bounding box)을 좌표 기준 +-0.2도 정도로 잡아 도시 주변이 보이게 한다.
const mapSrc = computed(() => {
  const delta = 0.25
  const bbox = [props.lon - delta, props.lat - delta, props.lon + delta, props.lat + delta].join(
    '%2C',
  )
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${props.lat}%2C${props.lon}`
})

const externalLink = computed(
  () =>
    `https://www.openstreetmap.org/?mlat=${props.lat}&mlon=${props.lon}#map=10/${props.lat}/${props.lon}`,
)
</script>

<template>
  <div class="map-card">
    <div class="map-frame-wrap">
      <iframe
        class="map-frame"
        :src="mapSrc"
        title="city-location-map"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <a class="map-link" :href="externalLink" target="_blank" rel="noopener">
      📍 {{ cityName }} 위치 크게 보기
    </a>
  </div>
</template>

<style scoped>
.map-card {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e6e9f0;
  background: #fff;
}

.map-frame-wrap {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.map-frame {
  width: 100%;
  height: 100%;
  border: 0;
}

.map-link {
  display: block;
  text-align: center;
  padding: 10px;
  font-size: 0.85rem;
  color: #3563e9;
  text-decoration: none;
  background: #f8faff;
}

.map-link:hover {
  text-decoration: underline;
}
</style>
