export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "Hello, Next.js!" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json', // Specify content type for JSON
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
