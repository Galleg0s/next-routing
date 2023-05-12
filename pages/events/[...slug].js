import Head from "next/head";
import { getFilteredEvents } from "../../data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";

const FilteredEvents = ({ events, hasError, year, month }) => {
  const pageHeadData = (
    <Head>
      <title>Filtered NextJSEvents</title>
      <meta name="description" content={`All events for ${month}/${year}.`} />
    </Head>
  );

  if (hasError) {
    return (
      <>
        {pageHeadData}
        <p className="center">
          Invalid filter values! Please adjust selected year or month.
        </p>
      </>
    );
  }

  if (!events) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  if (events.length === 0) {
    return (
      <>
        {pageHeadData}
        <div className="center">
          <Button link="/events">Show all events</Button>
          <p className="center">No Events Found.</p>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      <Head>
        <title>Filtered NextJS Events</title>
        <meta name="description" content={`All events for ${month}/${year}.`} />
      </Head>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const year = Number(filterData[0]);
  const month = Number(filterData[1]);

  const invalidFilterValues =
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2022 ||
    month > 12 ||
    month < 1;

  if (invalidFilterValues) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = getFilteredEvents({
    year,
    month,
  });

  return {
    props: {
      year,
      month,
      events: filteredEvents,
    },
  };
}

export default FilteredEvents;
