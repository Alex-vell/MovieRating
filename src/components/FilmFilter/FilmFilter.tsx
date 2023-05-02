import { FC, useId } from 'react';
import Select, { SingleValue } from 'react-select';
import { SelectDada } from '@/types';

interface FilmFilterProps {
  handleTypeChange: (value: SingleValue<SelectDada>) => void;
  handleYearChange: (value: SingleValue<SelectDada>) => void;
  typeOptions: SelectDada[];
  yearOptions: SelectDada[];
}

const FilmFilter: FC<FilmFilterProps> = ({
                                           handleTypeChange,
                                           handleYearChange,
                                           typeOptions,
                                           yearOptions,
                                         }) => {
  return (
    <div
      className='flex justify-start gap-10 mb-10 pl-3 w-[60%] max-[480px]:w-full max-[480px]:pl-0'>
      <div className='w-1/3 min-w-[143px]'>
        <Select
          onChange={e => {
            handleTypeChange(e);
          }}
          options={typeOptions}
          placeholder='Тип'
          instanceId={useId()}
        />
      </div>
      <div className='w-1/3 min-w-[143px]'>
        <Select
          onChange={e => {
            handleYearChange(e);
          }}
          options={yearOptions}
          placeholder='Год'
          instanceId={useId()}
        />
      </div>
    </div>
  );
};

export default FilmFilter;
