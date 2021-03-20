const axios = require('axios')

async function handler(request, response) {
  try {
    const { data } = await axios.get('https://v2.jokeapi.dev/joke/programming')

    return response.status(200).json({
      joke: data.joke || data.delivery,
    })
  } catch (error) {
    return response.status(400).json({ error: 'Oof.. Something went bad' })
  }
}

module.exports = handler
