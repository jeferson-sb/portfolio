export default async (request, context) => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/programming')
    const data = await response.json()
    const ip =
      context.ip ||
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      null

    return Response.json({ joke: data.joke || data.delivery, ip }, { status: 200 })
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: 'Oof.. Something went bad' },
    }
  }
}
