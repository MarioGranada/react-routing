import { API_URL } from '../config';
/* eslint-disable no-throw-literal */
const eventsLoader = async () => {
  const response = await fetch(API_URL + '/events');
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
