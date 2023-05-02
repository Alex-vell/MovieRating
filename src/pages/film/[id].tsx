import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Film } from '@/types';
import { ParsedUrlQuery } from 'querystring';
import Title from '@/components/Title/Title';
import Carousel from '@/components/Carousel/Carousel';
import { useState } from 'react';
import ImagePopup from '@/components/ImagePopup/ImagePopup';
import { BASE_URL } from '@/shared/constants/url';
import FilmCreatorsInfo from '@/components/FilmCreatorsInfo/FilmCreatorsInfo';
import Head from 'next/head';

interface FilmProps {
    film: Film;
}

const FilmPage = ({ film }: FilmProps) => {
    const { name, poster, stills, team, description } = film;

    const [isModal, setIsModal] = useState<boolean>(false);
    const [currentImg, setCurrentImg] = useState<string | null>(null);

    const directors = team?.filter(m => m.role === 'director');
    const producers = team?.filter(teamMember => teamMember.role === 'producer');
    const actors = team?.filter(teamMember => teamMember.role === 'actor');

    const onImageClickHandler = (img: string) => {
        setIsModal(prevState => !prevState);
        setCurrentImg(img);
    };
    const closePopup = () => {
        setIsModal(false);
        setCurrentImg(null);
    };

    return (
      <>
          <Head>
              <title>{film.name}</title>
          </Head>
          <div className='flex-col w-full justify-center items-center h-full p-5 mb-20'>
              <div
                className='flex justify-between items-start justify-center align-middle mb-20 pb-10 border-solid border-b border-b-neutral-800 max-[680px]:flex-col-reverse max-[680px]:justify-start'>
                  <div className='inline-flex min-w-[308px] min-h-[476px] m-0'>
                      <Image
                        src={poster}
                        alt='poster'
                        width={0}
                        height={0}
                        sizes='308px'
                        className='w-[308px] h-auto'
                        placeholder='blur'
                        blurDataURL={poster}
                      />
                  </div>

                  <div
                    className='inline-block w-2/3 mt-0 mb-10 max-[1080px]:ml-10 max-[680px]:ml-0 max-[680px]:w-full'>
                      <Title text={name} tag='h2'
                             className='m-auto text-start text-white font-bold text-xl mb-10 ' />
                      <FilmCreatorsInfo creators={directors} label='Режиссер' />
                      <FilmCreatorsInfo creators={producers} label='Продюсер' />
                      <FilmCreatorsInfo creators={actors} label='В главных ролях' />

                      <p className='text-gray-300 mt-10'>
                        <span
                          className='inline-block w-40 mr-2 text-gray-400 max-[680px]:mr-0.5'
                        >
                            Сюжет фильма:
                        </span>
                          {description}
                      </p>
                  </div>
              </div>

              <div className='m-auto'>
                  <Carousel stills={stills} onImageClick={onImageClickHandler} />
              </div>

              {isModal && currentImg && <ImagePopup onClick={closePopup}>
                  <Image
                    src={currentImg!}
                    alt='poster'
                    className='flex items-center justify-center mx-auto w-[80%] h-auto max-[680px]:w-[95%] max-[680px]:h-auto'
                    width={0}
                    height={0}
                    sizes='80%'
                    placeholder='blur'
                    blurDataURL={currentImg!}
                  />
              </ImagePopup>}
          </div>
      </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    const paths = data.map((film: Film) => ({
        params: { id: film.id.toString() },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<FilmProps> = async (context: GetStaticPropsContext) => {
    const { id } = context.params as ParsedUrlQuery;
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: { film: data },
    };
};

export default FilmPage;
