import { useRouteLoaderData } from 'react-router-dom';
import EventItem from '../../components/EventItem';

const EventDetail = () => {
  const event = useRouteLoaderData('event-detail');

  return <EventItem event={event} />;
};

export default EventDetail;
