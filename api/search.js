export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { region_id, checkin, checkout, adults } = req.query

  const response = await fetch('https://api.worldota.net/api/b2b/v3/search/serp/region/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`${process.env.RATEHAWK_USER_ID}:${process.env.RATEHAWK_API_KEY}`).toString('base64')
    },
    body: JSON.stringify({
      language: 'en',
      region_id,
      checkin,
      checkout,
      guests: [{ adults: Number(adults || 2) }]
    })
  })

  const data = await response.json()
  res.status(response.status).json(data)
}
