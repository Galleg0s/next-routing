import { useRouter } from "next/router";
import { getFilteredEvents } from "../../data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";

const FilteredEvents = () => {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const numYear = Number(filterData[0]);
  const numMonth = Number(filterData[1]);

  const invalidFilterValues =
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2022 ||
    numMonth > 12 ||
    numMonth < 1;

  if (invalidFilterValues) {
    return (
      <p className="center">
        Invalid filter values! Please adjust selected year or month.{" "}
      </p>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (filteredEvents.length === 0) {
    return <p className="center">No Events Found.</p>;
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </>
  );
};

export default FilteredEvents;
