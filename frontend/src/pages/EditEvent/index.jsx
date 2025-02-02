import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../../components/EventForm';

const EditEvent = () => {
  const data = useRouteLoaderData('event-detail');
  return <EventForm method="patch" event={data} />;
};

export default EditEvent;
