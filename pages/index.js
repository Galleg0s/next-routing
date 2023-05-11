import { getFeaturedEvents } from "../data";
import EventList from "../components/events/event-list";

const HomePage = (props) => {
  const events = props.events || [];

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div>
      <h1>Featured Events:</h1>
      <EventList events={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = getFeaturedEvents();

  return {
    props: {
      events,
    },
    revalidate: 1800,
  };
}

export default HomePage;
