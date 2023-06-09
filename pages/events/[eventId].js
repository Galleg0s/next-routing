import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../../data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Comments from "../../components/input/comments";

const EventDetailPage = ({ event }) => {
  if (!event) {
    return <p className="center">Loading...</p>;
  }

  return (
    <>
      <Head>
        <title>NextJS Events: {event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
      <p className="center">{event.body}</p>
      <Comments eventId={event.id}></Comments>
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const postId = Number(eventId.substr(1));
  const selectedEvent = getEventById(eventId);

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  const eventWithBody = await response.json().then((data) => {
    return {
      ...selectedEvent,
      body: data.body,
    };
  });

  return {
    props: {
      event: eventWithBody,
      revalidate: 60,
    },
  };
}

export async function getStaticPaths() {
  const events = getFeaturedEvents();

  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));

  return { paths, fallback: true };
}

export default EventDetailPage;
