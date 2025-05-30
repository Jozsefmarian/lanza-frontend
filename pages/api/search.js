export default async function handler(req, res) {
  const { regionId, checkIn, checkOut, adults } = req.query;

  try {
    const response = await fetch("https://api.worldota.net/api/b2b/v3/search/serp/region/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.RATEHAWK_USER_ID}:${process.env.RATEHAWK_API_KEY}`
          ).toString("base64"),
      },
      body: JSON.stringify({
        language: "en",
        region_id: parseInt(regionId),
        checkin: checkIn,
        checkout: checkOut,
        residency: "HU", // fontos: állampolgárságot mindig küldjünk
        guests: [{ adults: parseInt(adults), children: [] }],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Ratehawk data" });
  }
}
