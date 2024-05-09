import { useLoaderData } from 'react-router-dom';
import EventsList from '../../components/EventsList';

function EventsPage() {
  const fetchedEvents = useLoaderData();

  if (DataTransfer.isError) {
    return <p>{fetchedEvents.message} </p>;
  }

  return <EventsList events={fetchedEvents} />;
}

export default EventsPage;
