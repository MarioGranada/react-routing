/* eslint-disable no-throw-literal */
import { redirect } from 'react-router-dom';

const deleteAction = async ({ params, request }) => {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });
  if (!response.ok) {
    throw {
      message: 'Could not delete event.',
      status: 500,
    };
  }

  return redirect('/events');
};

export default deleteAction;
