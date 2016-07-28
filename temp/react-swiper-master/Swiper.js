import React, { Component, PropTypes } from 'react';

import './node_modules/swiper/dist/css/swiper.css';
import SwiperPlugin from 'swiper';

import SwiperSlide from './SwiperSlide';

class Swiper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: Object.assign({}, {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        onSliderMove() {
          window.disableTapEvents = true;
        },
        onTouchEnd() {
          setTimeout(() => {
            window.disableTapEvents = false;
          }, 100);
        },
      },
      props.settings),
    };
  }
  componentDidMount() {
    const { settings } = this.state;

    if (this.swiperInstance === undefined) {
      this.swiperInstance = new SwiperPlugin(this.refs.swiper, settings);
    }
  }
  componentWillUnmount() {
    if (this.swiperInstance !== undefined && this.props.children.length > 0) {
      this.swiperInstance.destroy();
      this.swiperInstance = undefined;
    }
  }
  render() {
    const { children } = this.props;
    const { settings } = this.state;

    return (
      <div className="swiper-container" ref="swiper">
        <div className="swiper-wrapper">
          {children.map((c, i) =>
            <SwiperSlide key={`slide-${i}`}>
              {React.cloneElement(c)}
            </SwiperSlide>
          )}
        </div>
        {'pagination' in settings && settings.pagination
          ? <div className="swiper-pagination"></div>
          : null
        }
        {'nextButton' in settings
          ? <div className={settings.nextButton.replace(/^\./g, '')}></div>
          : null
        }
        {'prevButton' in settings
          ? <div className={settings.prevButton.replace(/^\./g, '')}></div>
          : null
        }
        {'scrollbar' in settings
          ? <div className={settings.scrollbar.replace(/^\./g, '')}></div>
          : null
        }
      </div>
    );
  }
}

Swiper.propTypes = {
  children: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
};

Swiper.defaultProps = {
  settings: {},
};

export default Swiper;
