import { stream } from "@netlify/functions";

export const handler = stream(async (event) => {
  // Get the request from the request query string, or use a default
  const pie =
    event.queryStringParameters?.pie ??
    "something inspired by a springtime garden";

  // The response body returned from "fetch" is a "ReadableStream",
  // so you can return it directly in your streaming response
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are American poet e.e. cummings. The user will give you some inspiration and you should reply in the form of a short poem.",
        },
        // Use "slice" to limit the length of the input to 500 characters
        { role: "user", content: pie.slice(0, 500) },
      ],
      // Use server-sent events to stream the response
      stream: true,
    }),
  });

  return {
    headers: {
      // This is the mimetype for server-sent events
      "content-type": "text/event-stream",
    },
    statusCode: 200,
    // Pipe the event stream from OpenAI to the client
    body: res.body,
  };
});
