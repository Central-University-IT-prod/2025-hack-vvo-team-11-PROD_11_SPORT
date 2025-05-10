
import React, { useState } from 'react';
import EventCard1 from './EventCard1';
import './SportsCarousel.css';

const SportsCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? events.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === events.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="sports-carousel">
      <button className="carousel-button carousel-button-prev" onClick={goToPrevious}>
        &lt;
      </button>
      <div className="carousel-cards-container">
        <EventCard1 event={events[currentIndex]} />
      </div>
      <button className="carousel-button carousel-button-next" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default SportsCarousel;