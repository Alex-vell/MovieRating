import { FC } from 'react';

interface TitleProps {
  tag?: keyof JSX.IntrinsicElements;
  text: string;
  className?: string;
}

const Title: FC<TitleProps> = ({ tag, text, className }) => {
  const Tag = tag || 'h1';
  return <Tag className={className}>{text}</Tag>;
};

export default Title;
