
import type { Handler } from "@netlify/functions";

const handler: Handler = async () => {
  // your server-side functionality
  return {
    statusCode:200, 
    body: JSON.stringify({ message: "ooookkkkkk" })
  }
};

export { handler };
