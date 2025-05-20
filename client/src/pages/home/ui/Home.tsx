import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import s from './Home.module.scss';

const desktopImages = [
  { url: '/2.webp' },
  { url: '/4.webp' }
];

const mobileImages = [
  { url: '/1.webp' },
  { url: '/3.webp' }
];

export function Home() {
  const [images, setImages] = useState(() => 
    window.innerWidth <= 768 ? mobileImages : desktopImages
  );

  useEffect(() => {
    const handleResize = () => {
      setImages(window.innerWidth <= 768 ? mobileImages : desktopImages);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={s.sliderWrapper}>
      <div className={s.sliderContainer}>
        <Slide
          duration={3000}
          transitionDuration={500}
          autoplay
          infinite
          arrows={false}
        >
          {images.map((slideImage, index) => (
            <div key={index} className={s.slide}>
              <img
                src={slideImage.url}
                alt={`Slide ${index + 1}`}
                className={s.slideImage}
              />
            </div>
          ))}
        </Slide>
      </div>
      
      <div className={s.contentBlock}>
        <div className={s.headerBlock}>
          <div className={s.leftBlock}>
            <h1>ОБУВЬ</h1>
          </div>
          <div className={s.rightBlock}>
            <Link to="/shop">
              все модели
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}