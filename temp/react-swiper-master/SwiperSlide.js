import React, { PropTypes } from 'react';

const SwiperSlide = ({ children }) => (
  <div className="swiper-slide">
    {children}
  </div>
);

SwiperSlide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SwiperSlide;
