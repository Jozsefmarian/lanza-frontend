export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const body = await req.body

  const response = await fetch('https://api.worldota.net/api/b2b/v3/hotel/prebook/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`${process.env.RATEHAWK_USER_ID}:${process.env.RATEHAWK_API_KEY}`).toString('base64')
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  res.status(response.status).json(data)
}
