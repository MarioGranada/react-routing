/* eslint-disable no-throw-literal */
const loader = async ({ request, params }) => {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId);

  if (!response.ok) {
    throw {
      message: 'Could not fetch event.',
      status: 500,
    };
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

export default loader;
