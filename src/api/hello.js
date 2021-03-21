const axios = require('axios')

exports.handler = async (event, context) => {
  try {
    const { data } = await axios.get('https://v2.jokeapi.dev/joke/programming')

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
