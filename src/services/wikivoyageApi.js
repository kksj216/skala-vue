const BASE_URL = 'https://en.wikivoyage.org/api/rest_v1/page/summary'

/**
 * 도시 이름(영문 권장, 'Bangkok', 'Seoul')으로 Wikivoyage 요약 정보를 가져온다.
 * 문서가 없으면 에러를 던진다 (호출부에서 try/catch로 처리).
 */
export async function fetchCityGuide(cityName) {
  const title = encodeURIComponent(cityName.trim())
  const response = await fetch(`${BASE_URL}/${title}`, {
    headers: { accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Wikivoyage 문서를 찾을 수 없습니다: ${cityName}`)
  }

  const data = await response.json()

  return {
    title: data.title,
    extract: data.extract, // 도시 소개 요약 텍스트
    thumbnailUrl: data.thumbnail?.source ?? null,
    pageUrl: data.content_urls?.desktop?.page ?? `https://en.wikivoyage.org/wiki/${title}`,
  }
}
