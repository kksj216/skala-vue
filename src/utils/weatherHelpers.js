/**
 * 섭씨 온도와 날씨 상태(main)를 바탕으로 하루를 응원하는 1~2문장 멘트를 반환한다.
 */
export function getEncouragementMessage(tempCelsius, main = '') {
  const isRainy = /rain|drizzle|thunderstorm/i.test(main)
  const isSnowy = /snow/i.test(main)

  if (isSnowy) {
    return { emoji: '❄️', message: '눈 내리는 오늘, 길이 미끄러울 수 있으니 천천히 다녀오세요. 따뜻하게 챙겨입는 것 잊지 마세요!' }
  }
  if (isRainy) {
    return { emoji: '☔', message: '비 소식이 있어요. 우산 챙기고, 발걸음 조심히 옮기는 하루 되세요.' }
  }
  if (tempCelsius >= 33) {
    return { emoji: '🥵', message: '무더위가 절정이에요. 수분 보충 자주 하시고 그늘에서 잠깐씩 쉬어가세요.' }
  }
  if (tempCelsius >= 28) {
    return { emoji: '☀️', message: '더운 하루가 예상돼요. 시원한 물 한잔과 함께 활기차게 시작해봐요!' }
  }
  if (tempCelsius >= 18) {
    return { emoji: '🌤️', message: '딱 좋은 날씨네요. 오늘 하루도 산뜻하게, 좋은 일만 가득하길 바라요!' }
  }
  if (tempCelsius >= 10) {
    return { emoji: '🍂', message: '선선한 공기가 기분 좋은 하루예요. 가벼운 겉옷 하나 챙기면 딱 좋겠어요.' }
  }
  if (tempCelsius >= 0) {
    return { emoji: '🧣', message: '쌀쌀한 날씨예요. 목도리 하나 두르고 따뜻하게 하루를 시작해봐요.' }
  }
  return { emoji: '🥶', message: '매서운 추위가 이어져요. 실내에서도 온기를 잃지 않도록 든든히 챙겨입으세요.' }
}

/** timezone 오프셋(초)을 이용해 해당 도시의 "현재 로컬 시각"을 계산한다. */
export function getLocalDate(timezoneOffsetSec, baseDate = new Date()) {
  const nowUtcMs = baseDate.getTime() + baseDate.getTimezoneOffset() * 60000
  return new Date(nowUtcMs + timezoneOffsetSec * 1000)
}

/** 로컬 시각을 "오전 10:32" 같은 문자열로 포맷 */
export function formatLocalTime(timezoneOffsetSec, baseDate = new Date()) {
  const local = getLocalDate(timezoneOffsetSec, baseDate)
  // getLocalDate가 이미 오프셋을 반영했으므로, 브라우저의 로컬 타임존 보정이 다시 걸리지 않도록 UTC로 읽는다.
  return local.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
}

/** UNIX timestamp(초)를 해당 도시 로컬 기준 "오전 10:32" 문자열로 포맷 (일출/일몰용) */
export function formatUnixToLocalTime(unixSeconds, timezoneOffsetSec) {
  // UTC 기준 ms에 도시의 timezone 오프셋을 더한 뒤, UTC 시각으로 "읽어서" 그 도시의 로컬 시각처럼 표시한다.
  const localMs = (unixSeconds + timezoneOffsetSec) * 1000
  const local = new Date(localMs)
  return local.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  })
}