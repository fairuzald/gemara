import { Button } from '@/components/ui/button';

interface Props {
  data: {
    name: string;
    link: string;
    image: {
      src: string;
      width: number;
      height: number;
      alt: string;
    };
  }[];
}

export default function CardPreset({ data }: Props) {
  return (
    <div className='flex flex-wrap gap-8 lg:gap-12 2xl:gap-20 items-center justify-center'>
      {data.map((preset, index) => (
        <div
          key={index}
          className='flex flex-col gap-4 lg:gap-6 items-center justify-center'
        >
          <a
            href={preset.link}
            className='rounded-lg overflow-hidden w-[200px] h-[200px] lg:w-[350px] lg:h-[350px]'
            aria-label={preset.name}
          >
            <picture>
              <source
                type='image/webp'
                srcSet={`${
                  preset.image.src.split('.')[0]
                }.webp?width=100 100w,`}
              />
              <img
                data-cy={`carousel-image-${index}`}
                src={preset.image.src}
                width={preset.image.width}
                height={preset.image.height}
                alt={preset.image.alt}
                decoding={'async'}
                loading={'lazy'}
                className='object-contain bg-brown-dark w-full h-full object-center rounded-lg hover:scale-105 duration-300 transition-all'
                sizes='(max-width: 1024px) 200px, 350px'
              />
            </picture>
          </a>

          <h3 className='text-black font-bold -mt-2'>{preset.name}</h3>
          <a href={preset.link} aria-label={preset.name}>
            <Button variant={'default'} className='max-w-[200px] font-bold'>
              Customize
            </Button>
          </a>
        </div>
      ))}
    </div>
  );
}
