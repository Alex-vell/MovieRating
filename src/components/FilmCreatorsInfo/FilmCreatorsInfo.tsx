import { FC } from 'react';
import { TeamMember } from '@/types';

interface FilmCreatorsInfoProps {
  creators: TeamMember[];
  label: string;
}

const FilmCreatorsInfo: FC<FilmCreatorsInfoProps> = ({ creators, label }) => {
  return (
    <p className='text-start'>
      <span className='inline-block w-40 mr-2 text-gray-400 max-[680px]:mr-0.5'>
        {label}:
      </span>
      {
        creators?.map((m, index) => (
          <span key={m.id} className='font-semibold text-gray-300'>
            {m.name}{index !== creators.length - 1 ? ', ' : ''}
          </span>
        ))
      }
    </p>
  );
};

export default FilmCreatorsInfo;
