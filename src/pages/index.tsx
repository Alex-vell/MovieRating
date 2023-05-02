import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { FC, useState } from 'react';
import { Film, SelectDada } from '@/types';
import FilmListItem from '@/components/FilmListItem/FilmListItem';
import { getData } from '@/pages/api/users/users';
import { BASE_URL } from '@/shared/constants/url';
import Head from 'next/head';
import { getSelectData } from '@/shared/utils/getSelectData';
import NoData from '@/components/NoData/NoData';
import FilmFilter from '@/components/FilmFilter/FilmFilter';
import { SingleValue } from 'react-select';

interface HomeProps {
  films: Film[];
}

const Home: FC<HomeProps> = ({ films }) => {
  const [selectedTypeOption, setSelectedTypeOption] = useState<SelectDada | null>(null);
  const [selectedYearOption, setSelectedYearOption] = useState<SelectDada | null>(null);
  const [data, setData] = useState<Film[]>(films);

  const typeOptions = getSelectData(films, 'Все типы', 'type');
  const yearOptions = getSelectData(films, 'Все года', 'year');

  const handleTypeChange = (type: SingleValue<SelectDada>) => {
    const queryParams = selectedYearOption
      ? { year: selectedYearOption.value, type: type?.value }
      : { year: '', type: type?.value };
    setSelectedTypeOption(type);
    getData(queryParams)
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleYearChange = (year: SingleValue<SelectDada>) => {
    const queryParams = selectedTypeOption
      ? { year: year?.value, type: selectedTypeOption.value }
      : { year: year?.value, type: '' };

    setSelectedYearOption(year);
    getData(queryParams)
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Head>
        <title>Киновтопку</title>
      </Head>

      <div className='bg-white w-full min-w-[70%] px-5 max-[480px]:p-0'>
        <FilmFilter
          handleTypeChange={handleTypeChange}
          handleYearChange={handleYearChange}
          typeOptions={typeOptions}
          yearOptions={yearOptions}
        />

        {data.map((film, index) => (
          <FilmListItem key={film.id} film={film} index={index} />
        ))}

        {!data.length && <NoData />}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { type } = context.query;
  const res = await fetch(`${BASE_URL}${type ? `?type=${type}` : ''}`);
  const data = await res.json();
  if (!data) {
    return data;
  }

  return {
    props: { films: data },
  };
};

export default Home;
