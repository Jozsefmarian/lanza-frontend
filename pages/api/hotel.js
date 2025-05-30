export default async function handler(req, res) {
  const { hid } = req.query;

  try {
    const response = await fetch("https://api.worldota.net/api/b2b/v3/hotel/info/", {
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
        hotel_id: parseInt(hid),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    res.status(200).json({ hotel: data });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hotel info" });
  }
}
