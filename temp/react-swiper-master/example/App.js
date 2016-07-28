import React from 'react';
import Swiper from '../Swiper';

const App = () => (
  <div>
    <Swiper
      settings={{
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
      }}
    >
      {[...Array(10)].map((x, i) =>
        <div key={i}>Slide {i + 1}</div>
      )}
    </Swiper>
  </div>
);

export default App;
