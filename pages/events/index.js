import { useRouter } from "next/router";
import { getAllEvents } from "../../data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const AllEventsPage = ({ events = [] }) => {
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events}></EventList>
    </>
  );
};

export async function getStaticProps(context) {
  const events = getAllEvents();

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

  const eventsWithBody = await response.json().then((data) => {
    return events.map((event, index) => {
      return {
        ...event,
        body: data[index].body,
      };
    });
  });

  return {
    props: {
      events: eventsWithBody,
      revalidate: 60,
    },
  };
}

export default AllEventsPage;
