import EventItem from "./event-item";
import classes from "./event-list.module.css";

const EventList = ({ events }) => {
  return (
    <ul className={classes.list}>
      {events.map(({ id, location, title, image, date }) => (
        <EventItem
          key={id}
          id={id}
          location={location}
          title={title}
          image={image}
          date={date}
        />
      ))}
    </ul>
  );
};

export default EventList;
