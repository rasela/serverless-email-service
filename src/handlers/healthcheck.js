async function healthcheck(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "UP" }),
  };
}

export const handler = healthcheck;
