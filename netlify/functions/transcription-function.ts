// netlify/functions/openaiFunction.js
import axios from 'axios';
import type { Handler, HandlerEvent } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent) => {
  const query = event.queryStringParameters.question || 'Write me a short poem about tigers.';
  try {
    // Your OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are American poet e.e. cummings.' },
        { role: 'user', content: query },
      ],
      max_tokens:40
    };
    const res = await axios({
      method: 'POST',
      url:'https://api.openai.com/v1/chat/completions',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      }
    })
    .then( (response) => {
      return JSON.stringify(response.data)
    })
    .catch((error) => {
      return {
        statusCode: 422,
        body: `Error: ${error}`
      }
    });
    return {
      statusCode:200,
      body: JSON.stringify(res.data.choices[0].message.content)
    }
 
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};

export { handler };
