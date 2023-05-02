import { FC } from 'react';
import { Film } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';

interface FilmComponentProps {
    film: Film;
    index: number;
}

const FilmListItem: FC<FilmComponentProps> = ({ film, index }) => (
  <Link href={`/film/${film.id}`}>
      <div
        className='rounded-xl px-3 hover:bg-gray-100 transition-colors duration-200 max-[480px]:p-0 max-[680px]:px-0'>
          <div
            className='cursor-pointer flex items-start p-5 border-solid border-t border-gray-100 max-[480px]:px-0 max-[680px]:px-0 max-[480px]:py-5'>
              <div className='flex items-center font-bold small:ml-[20px] ml-[10px]'>
                  {index + 1}
              </div>
              <Image
                src={film.poster}
                alt='poster'
                className='inline mx-5 w-[100px] h-auto max-[480px]:w-[72px] max-[480px]:h-[108px]'
                width={0}
                height={0}
                sizes='100px'
                placeholder='blur'
                blurDataURL={film.poster}
              />
              <div className='flex justify-center flex-col text-sm'>
                  <p className='mb-1 font-bold text-lg max-[480px]:text-sm'>{film.name}</p>
                  <p className='mb-1 font-light text-base max-[480px]:text-xs'>Дата
                      выхода: {dayjs(film.release).format('DD.MM.YYYY')}</p>
                  <p
                    className=' text-gray-500 text-base max-[480px]:text-sm'>{film.shortDescription}</p>
              </div>
          </div>
      </div>
  </Link>
);

export default FilmListItem;
