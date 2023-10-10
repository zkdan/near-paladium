// netlify/functions/openaiFunction.js
import axios, {AxiosResponse, AxiosError} from 'axios';
import type { Handler, HandlerEvent } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent) => {
  const query = event.queryStringParameters?.question || 'Write me a short poem about tigers, please.';
  try {
    // Your OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are American poet e.e. cummings.' },
        { role: 'user', content: query },
      ],
      max_tokens:80
    };
    const res:AxiosResponse = await axios({
      method: 'POST',
      url:'https://api.openai.com/v1/chat/completions',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
    return {
      statusCode:200,
      body: JSON.stringify(res.data.choices[0].message.content)}
 
  } catch (error:AxiosError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: AxiosError.message }),
    };
  }
};

export { handler };
