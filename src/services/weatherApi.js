import axios from 'axios'

// API 키는 .env 파일에 VITE_OPENWEATHER_API_KEY=키 형태로 넣고
// import.meta.env로 읽어오기
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function buildParams(extra = {}) {
  return {
    appid: API_KEY,
    units: 'metric', // 섭씨 기준으로 통일 수신 (화씨 변환은 utils에서 별도 처리)
    lang: 'kr',
    ...extra,
  }
}

/**
 * OpenWeather의 raw 응답을 화면에서 쓰기 좋은 형태로 정규화한다.
 * -> 컴포넌트가 raw.weather[0].description 같은 구조를 몰라도 되게 만든다.
 */
function normalizeWeatherResponse(raw) {
  return {
    cityName: raw.name,
    country: raw.sys?.country ?? '',
    coord: { lat: raw.coord.lat, lon: raw.coord.lon },
    tempCelsius: raw.main.temp,
    feelsLike: raw.main.feels_like,
    humidity: raw.main.humidity,
    windSpeed: raw.wind.speed,
    description: raw.weather[0].description,
    main: raw.weather[0].main, // Clear, Rain, Snow ...
    icon: raw.weather[0].icon,
    timezoneOffsetSec: raw.timezone, // UTC 기준 오프셋(초) -> 현지 시각 계산용
    sunrise: raw.sys.sunrise,
    sunset: raw.sys.sunset,
    fetchedAt: Date.now(),
  }
}

/** 도시 이름으로 현재 날씨 조회 ('Seoul,KR') */
export async function fetchWeatherByCityName(query) {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: buildParams({ q: query }),
  })
  return normalizeWeatherResponse(data)
}

/** 위도/경도로 현재 날씨 조회 */
export async function fetchWeatherByCoords(lat, lon) {
  const { data } = await axios.get(`${BASE_URL}/weather`, {
    params: buildParams({ lat, lon }),
  })
  return normalizeWeatherResponse(data)
}

/** 날씨 아이콘 코드를 실제 이미지 URL로 변환 */
export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
