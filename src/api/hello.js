exports.handler = async (req, context) => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/programming')
    const data = await response.json()
    const ip =
      context.ip ||
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      null

    return {
      statusCode: 200,
      body: JSON.stringify({
        joke: data.joke || data.delivery,
        ip,
      }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: 'Oof.. Something went bad' },
    }
  }
}
