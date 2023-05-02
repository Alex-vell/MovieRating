import { Film } from '@/types';

export const getSelectData = (data: Film[], label: string, selectData: string) => {
  let currOptions = [] as string[];

  const options = [{ value: '', label: label }];

  const uniqueOptions = new Set<string>();

  data.forEach(film => currOptions.push(film.year));

  if (selectData === 'year') {
    // currOptions = sortBy(currOptions);
    currOptions = currOptions.sort((a, b) => Number(a) - Number(b) );
    currOptions.forEach(film => uniqueOptions.add(film));
  }

  if (selectData === 'type') {
    data.forEach(film => uniqueOptions.add(film.type));
  }

  uniqueOptions.forEach(item =>
    options.push({
      value: item,
      label: selectData === 'year' ? item : item === 'film' ? 'Фильм' : 'Сериал',
    }),
  );

  return options;
};
