import { redirect } from 'react-router-dom';

/* eslint-disable no-throw-literal */
const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    description: data.get('description'),
    date: data.get('date'),
    image: data.get('image'),
  };

  let url = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId;
  }

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  // console.log('in here oe response ok', {
  //   code: response.status,
  //   ok: response.ok,
  // });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw {
      message: 'Could not save event.',
      status: 500,
    };
  }

  return redirect('/events');
};

export default action;
