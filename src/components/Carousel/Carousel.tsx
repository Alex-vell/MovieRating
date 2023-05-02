import { FC } from 'react';
import { Navigation, Pagination, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselProps {
  stills: string[];
  onImageClick: (img: string) => void;
}

const Carousel: FC<CarouselProps> = ({ stills, onImageClick }) => {
  return (
    <Swiper
      zoom={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Zoom, Navigation, Pagination]}
      className='mySwiper z-0'
    >
      {stills?.map((still, index) => (
        <SwiperSlide key={index}>
          <Image
            src={still}
            alt='screen'
            width={0}
            height={0}
            sizes='700px'
            className='cursor-pointer mx-auto w-[700px] h-auto'
            onClick={() => {
              onImageClick(still);
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
