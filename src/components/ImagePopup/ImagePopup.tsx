import { FC, ReactNode, useCallback, useEffect } from 'react';
import { KEY_EVENT_TYPE, KEY_NAME_ESC } from '@/shared/constants/imagePopup';

interface ImagePopupProps {
    children: ReactNode;
    onClick: () => void;
}

const ImagePopup: FC<ImagePopupProps> = ({ children, onClick }) => {
    const handleEscKey = useCallback((event: DocumentEventMap['keyup']) => {
        if (event.key === KEY_NAME_ESC) {
            onClick();
        }
    }, [onClick]);

    useEffect(() => {
        document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

        return () => {
            document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        };
    }, [handleEscKey]);

    return (
      <div
        role='presentation'
        onClick={onClick}
        className='fixed top-0 left-0 flex items-center justify-center bg-black/50 w-full h-full z-10 transition-transform'>
          <div className='absolute flex w-[80%] h-[auto] max-[680px]:w-[95%] max-[680px]:h-[auto]'>
              {children}
          </div>
      </div>
    );
};

export default ImagePopup;
