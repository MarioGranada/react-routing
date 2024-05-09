/* eslint-disable no-throw-literal */
const eventsLoader = async () => {
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    throw {
      message: 'Could not fetch events.',
      status: 500,
    };
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export default eventsLoader;
