import { Dispatch, SetStateAction, useEffect } from 'react';
import { BsCheckAll } from 'react-icons/bs';
import { setTimeout } from 'timers';

interface WellMessageProps {
  text: string;
  display: boolean;
  setDisplayWell: Dispatch<SetStateAction<boolean>>;
}

const WellMessage:React.FC<WellMessageProps> = ({
  text,
  display,
  setDisplayWell,
}) => {

  useEffect(() => {
    setTimeout(() => setDisplayWell(false), 3000)
  },[display, setDisplayWell]);

  return (
    <>
      { display &&
        <div
          className='flex align-center justify-center bg-lime-600 text-white absolute top-[1%] right-[3%] w-1/5 rounded-lg p-2'
        >
          <BsCheckAll size={'2rem'} /> <span>&nbsp;{text}</span>
        </div>
      }
    </>
  )
}

export default WellMessage;