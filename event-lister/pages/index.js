import Head from 'next/head';
import { getFeaturedEvents } from '../helpers/api-util';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

import EventList from '../components/events/event-list';

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events' />
      </Head>
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}
