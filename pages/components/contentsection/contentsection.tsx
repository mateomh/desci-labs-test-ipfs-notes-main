import React from 'react'
import NoteCard from '../notecard/notecard';
import { BasicIpfsData } from '../../api/ipfs';

interface ContentSectionProps {
  notes: BasicIpfsData[];
};

const ContentSection:React.FC<ContentSectionProps> = ({
  notes
}) => {
  return (
    <div
      className='flex flex-col pt-[5vh] items-center w-4/5 scroll-y'
    >
      <h1
        className='font-bold text-5xl'
      >
        Notes
      </h1>
      { notes.map((note)=> <NoteCard key={note.cid} id={note.cid} text={note.content} />)}
    </div>
  )
};

export default ContentSection;