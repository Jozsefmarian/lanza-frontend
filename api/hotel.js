export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { hotel_id } = req.query

  const response = await fetch('https://api.worldota.net/api/b2b/v3/hotel/info/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`${process.env.RATEHAWK_USER_ID}:${process.env.RATEHAWK_API_KEY}`).toString('base64')
    },
    body: JSON.stringify({
      language: 'en',
      hotel_id
    })
  })

  const data = await response.json()
  res.status(response.status).json(data)
}
