self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method === 'POST') {
    // Handle POST request or let it pass through
    event.respondWith(fetch(request));
  } else {
    // Return 405 Method Not Allowed for other methods
    event.respondWith(
      new Response('Method Not Allowed', {
        status: 405,
        statusText: 'Method Not Allowed',
        headers: {
          'Content-Type': 'text/plain'
        }
      })
    );
  }
});
