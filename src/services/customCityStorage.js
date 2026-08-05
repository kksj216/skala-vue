const STORAGE_KEY = 'worldWeather:customCities'

/** 저장된 커스텀 도시 목록을 반환한다. 파싱 실패 시 빈 배열. */
export function getCustomCities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (err) {
    console.error('🔴 커스텀 도시 목록을 읽어오지 못했습니다:', err)
    return []
  }
}

/** 새 커스텀 도시를 저장한다. 이미 같은 id가 있으면 무시(중복 방지). */
export function addCustomCity(cityMeta) {
  const cities = getCustomCities()
  if (cities.some((c) => c.id === cityMeta.id)) return cities

  const updated = [...cities, cityMeta]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/** 특정 id의 커스텀 도시를 삭제한다. */
export function removeCustomCity(id) {
  const updated = getCustomCities().filter((c) => c.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

/** 도시 이름 + 국가코드로 안전한 고유 id를 만든다 (예: 'custom_bangkok_th'). */
export function buildCustomCityId(cityName, country) {
  const slug = `${cityName}_${country}`.toLowerCase().replace(/[^a-z0-9]+/g, '_')
  return `custom_${slug}`
}
