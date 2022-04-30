// import { useRouter } from 'next/router';
// import { getEventById } from '../../dumm-data';
import Head from 'next/head'
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from '../../helpers/api-util';

import EventSummery from '../../components/event-detail/event-summary';

import EventLogistics from '../../components/event-detail/event-logistics';

import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/events/error-alert';
import { getFilteredEvents } from '../../dumm-data';

function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);

  const event = props.selectedEvents;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{ event.title }</title>
        <meta name="description" content={`${event.description}`} />
      </Head>
      <EventSummery title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvents: event,
    },
  };
}

export async function getStaticPaths() {
  // const events = await getAllEvents();
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default EventDetailPage;
