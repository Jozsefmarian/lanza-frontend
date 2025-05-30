// pages/api/search.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST is allowed' })
  }

  const { region_id, check_in, check_out, adults } = req.body

  try {
    // 1. Region search
    const serpRegionRes = await fetch('https://api.worldota.net/api/b2b/v3/search/serp/region/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(process.env.RATEHAWK_USER_ID + ':' + process.env.RATEHAWK_API_KEY).toString('base64')
      },
      body: JSON.stringify({
        language: 'en',
        region_id,
        checkin: check_in,
        checkout: check_out,
        guests: [{ adults }],
        filters: {},
        sort: { by: 'popularity', order: 'desc' },
      }),
    })

    const serpRegionData = await serpRegionRes.json()

    if (!serpRegionData.search_id) {
      return res.status(500).json({ error: 'No search_id returned from region search', raw: serpRegionData })
    }

    // 2. Hotels from that search_id
    const hotelsRes = await fetch('https://api.worldota.net/api/b2b/v3/search/serp/hotels/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(process.env.RATEHAWK_USER_ID + ':' + process.env.RATEHAWK_API_KEY).toString('base64')
      },
      body: JSON.stringify({
        search_id: serpRegionData.search_id,
        offset: 0,
        limit: 20
      }),
    })

    const hotelsData = await hotelsRes.json()

    return res.status(200).json(hotelsData)

  } catch (err) {
    console.error('Ratehawk search error:', err)
    res.status(500).json({ error: 'API search failed', details: err.message })
  }
}
