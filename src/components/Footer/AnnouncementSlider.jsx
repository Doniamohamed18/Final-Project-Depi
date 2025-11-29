import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import  "./AnnouncementSlider.css"

export default function AnnouncementSlider() {
    return (
        <div className="col-lg-4 col-md-12 text-center">
            <div className="announcement-slider">
                <div className='swiper-wrapper'>
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    speed={600}
                    autoplay={{ delay: 2000 }}
                    slidesPerView={1}
                    direction="vertical"
                    autoHeight={true}
                >
                    <SwiperSlide className='swiper-slide'>🚚 Free shipping on orders over $50</SwiperSlide>
                    <SwiperSlide className='swiper-slide'>💰 30 days money back guarantee.</SwiperSlide>
                    <SwiperSlide className='swiper-slide'>🎁 20% off on your first order</SwiperSlide>
                </Swiper>
                </div>
            </div>
        </div>
    );
}
