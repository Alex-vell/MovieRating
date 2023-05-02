import Link from 'next/link';
import Image from 'next/image';
import Title from '@/components/Title/Title';

const Header = () => (
    <header className='flex m-0 bg-neutral-800'>
      <div className='flex items-center justify-start max-w-7xl w-full m-auto'>
        <Link href='/'>
          <Image
            property='true'
            src='/kinovtopku-logo.png'
            alt='Logo'
            className='flex space-betwen ml-14 m-4 small:ml-16  cursor-pointer mr-10 md:w-15 md:h-15 max-[480px]:h-10 max-[480px]:w-10 max-[480px]:m-4'
            width={60}
            height={60}
            placeholder='blur'
            blurDataURL='/kinovtopku-logo.png'
          />
        </Link>
        <Title tag='h1'
               className='flex items-center justify-center text-white small:text-2xl md:text-lg'
               text='Киновтопку'
        />
      </div>
    </header>

  );

export default Header;
