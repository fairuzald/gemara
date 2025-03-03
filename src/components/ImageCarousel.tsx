import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { type CarouselImageTypes } from '@/data/carousel-image';
import Autoplay from 'embla-carousel-autoplay';

interface ImageCarouselProps {
  images: CarouselImageTypes[];
  autoPlayInterval?: number;
  sizes?: string;
}

export default function ImageCarousel({
  images,
  autoPlayInterval,
  sizes,
}: ImageCarouselProps) {
  return (
    <Carousel
      className='w-full'
      plugins={
        autoPlayInterval
          ? [
              Autoplay({
                delay: autoPlayInterval,
              }),
            ]
          : []
      }
    >
      <CarouselContent data-cy='carousels'>
        {images.map((item, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className='w-full h-full flex flex-col relative'>
                <picture>
                  <source
                    type='image/webp'
                    srcSet={`${item.url.split('.')[0]}.webp?width=100 100w,`}
                  />
                  <img
                    data-cy={`carousel-image-${index}`}
                    src={item.url}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className={'w-screen h-screen object-center object-cover'}
                    sizes={'(max-width: 640px) 100vw, 100vw'}
                    decoding={'async'}
                    loading={'lazy'}
                  />
                </picture>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className={classButtonPrev} />
      <CarouselNext className={classButtonNext} /> */}
    </Carousel>
  );
}
