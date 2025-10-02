export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      const orderData = body.order;

      if (orderData === null || orderData.items === null || orderData.items.length === 0) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'Missing data.' })
        };
      }

      if (
        orderData.customer.email === null ||
        !orderData.customer.email.includes('@') ||
        orderData.customer.name === null ||
        orderData.customer.name.trim() === '' ||
        orderData.customer.street === null ||
        orderData.customer.street.trim() === '' ||
        orderData.customer['postal-code'] === null ||
        orderData.customer['postal-code'].trim() === '' ||
        orderData.customer.city === null ||
        orderData.customer.city.trim() === ''
      ) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            message: 'Missing data: Email, name, street, postal code or city is missing.',
          })
        };
      }

      const newOrder = {
        ...orderData,
        id: (Math.random() * 1000).toString(),
        timestamp: new Date().toISOString()
      };

      // In a real application, you would save this to a database
      // For now, we'll just simulate a successful order creation
      console.log('Order received:', newOrder);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ message: 'Order created!' })
      };
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid request body.' })
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ message: 'Method not allowed' })
  };
};