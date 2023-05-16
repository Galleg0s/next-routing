import Head from "next/head";
import { getFeaturedEvents } from "../data";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
  const events = props.events || [];

  if (events.length === 0) {
    return <p>No events found.</p>;
  }

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve"
        />
      </Head>
      <NewsletterRegistration></NewsletterRegistration>
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
