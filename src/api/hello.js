exports.handler = async (event, context) => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/programming')
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ joke: data.joke || data.delivery }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: 'Oof.. Something went bad' },
    }
  }
}
