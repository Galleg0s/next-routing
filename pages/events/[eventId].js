import { useRouter } from "next/router";
import { getEventById } from "../../data";

const EventDetailPage = () => {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    return <p>No Event Found!</p>;
  }

  return (
    <div>
      <h1>Event Detail Page</h1>
    </div>
  );
};

export default EventDetailPage;
