interface NoteCardProps {
  id: string;
  text: string;
}

const NoteCard:React.FC<NoteCardProps> = ({
  id,
  text
}) => {
  return (
    <div
      className={`flex flex-col p-5 m-8 border-2 border-stone-300 rounded-lg w-3/4 shadow-zinc-500 shadow-md whitespace-normal`}
    >
      <span className='truncate'><b>ID:  </b>{id}</span>
      <span className='whitespace-normal'><b>Text: </b>{text}</span>
    </div>
  )
};

export default NoteCard;