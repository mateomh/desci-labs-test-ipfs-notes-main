import axios from "axios";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { MdOutlineLibraryAdd, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { SiEvernote } from 'react-icons/si';
import { BasicIpfsData } from "../../api/ipfs";

interface SidePanelProps {
  setWellText: Dispatch<SetStateAction<string>>;
  setDisplayWell: Dispatch<SetStateAction<boolean>>;
  setNotes: Dispatch<SetStateAction<BasicIpfsData[]>>;
}

const SidePanel:React.FC<SidePanelProps> = ({
  setWellText,
  setDisplayWell,
  setNotes,
}) => {
  const [isOpen, setOpen] = useState<boolean>(true);
  const [noteActive, setNoteActive] = useState<boolean>(false);
  const [note, setNote] = useState<string>();
  const noteText = useRef<HTMLTextAreaElement>(null);

  const toggle = () => {
    setOpen(currOpen => !currOpen);
    setNoteActive(false);
  }

  const addNote = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setOpen(true);
    setNoteActive(true);
  };

  const submitNote = async () =>{
    console.log("NOTE", noteText.current?.textContent);
    try {
      const { data } = await axios.post("/api/ipfs", { note: noteText.current?.textContent });
      console.log("NOTE DATA", data);
      setNotes((currNotes) =>{
        return [...currNotes, data]
      });
      setNote("");
      setDisplayWell(true);
      setWellText("Note Added");
      setNoteActive(false);
    } catch (error) {
      console.log("there was an error");
    }    
  };

  const textChange = (event:React.ChangeEvent<HTMLTextAreaElement>) =>{
    setNote(event.target.value);
  }

  return (
    <div 
      className={`flex flex-col items-end h-[95vh] bg-gray-800 text-white gap-3 p-4 sticky top-0 w-1/5 transform ${isOpen ? 'translate-x-0' : '-translate-x-[150px]'} transition-transform duration-300`}
    >
        <div 
          className={`${isOpen && 'self-center'} mb-8`}
        >
          <SiEvernote size={'5rem'} />
        </div>
        <div 
          className="flex cursor-pointer sticky bottom-0 mb-8"
          onClick={addNote}
        >
          <MdOutlineLibraryAdd size={'2rem'} />
          &nbsp; {isOpen && 'Add Note'}
        </div>
        { noteActive && 
          <div
            className="flex flex-col gap-3 items-end mb-8"
          >
            <textarea
              rows={5}
              placeholder="Please enter your note"
              ref={noteText}
              onChange={textChange}
              value={note}
              className="text-black p-2 w-[100%] rounded-lg"
            >
            </textarea>
            <button
              className="bg-gray-600 p-2 rounded-lg"
              onClick={submitNote}
            >
              Save note
            </button>
          </div>
        }
        <div 
          className={`absolute bottom-0 pb-8`}
          onClick={toggle}
        >
          {isOpen ? <MdKeyboardDoubleArrowLeft size={'3rem'} /> : <MdKeyboardDoubleArrowRight size={'3rem'} />}
        </div>
    </div>
  )
};

export default SidePanel;