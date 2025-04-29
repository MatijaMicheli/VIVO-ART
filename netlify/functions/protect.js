// netlify/functions/protect.js
import arcjet, { shield, detectBot } from "@arcjet/node";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
  ],
});

export async function handler(event, context) {
  const result = await aj.evaluateRequest({
    ip: event.headers["client-ip"],
    headers: event.headers,
    path: event.path,
    method: event.httpMethod,
  });

  if (result.blocked) {
    return {
      statusCode: 403,
      body: "Access denied by Arcjet.",
    };
  }

  return {
    statusCode: 200,
    body: "Access granted.",
  };
}