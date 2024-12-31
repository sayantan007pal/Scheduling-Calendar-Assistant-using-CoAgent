import React, { useEffect, useState } from 'react';
import { getEvents } from '../api';

export default function CalendarView({ tokens }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents(tokens);
      setEvents(events);
    };
    fetchEvents();
  }, [tokens]);

  return (
    <div>
      <h1>Your Schedule</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.summary}</strong>
            <p>{new Date(event.start.dateTime).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
