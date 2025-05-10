import React from 'react';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.title}Футбольный матч</h3>
      <p className="event-time">{event.time}29.04.2025</p>
      <p className="event-description">{event.description}Подробнее о соревновании</p>
    </div>
  );
};

export default EventCard;