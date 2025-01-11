import { secondaryDominant } from "@/Concepts/lizzio/chords/utils";
import { mapChangeToSymbol } from "@/Concepts/lizzio/chords";

const AChordCard = ({note, possibles, alterations, selected, setSelected}) => {
 return (
   <div className={'flex flex-col items-center card p-6'}>
    <div className={'flex gap-6 text-center'}>
     {Object.keys(possibles).map((name) =>
       <div key={note + name} className={`flex flex-col items-center`}>
        <div onClick={() => setSelected(possibles[name]?.notes)}>{note}{possibles[name].symbol}</div>

        {possibles[name]?.notes.map((pitch, index) =>
          <div onClick={() =>
            index >= 2 && setSelected(possibles[name]?.notes.slice(0, index + 1))
          } key={pitch}
               className={`${selected.includes(pitch) ? 'bg-blue-200' : ''}
														rounded-md px-2 py-1 m-2 w-[37px] flex justify-center items-center`}>{pitch}</div>
        )}
       </div>
     )}
    </div>

    <div className={'flex gap-2 items-center mt-2 mb-6'}>
     {/*secondary dominant:*/}
     V7:
     {secondaryDominant(note).map((pitch) => (
       <div key={pitch} className={'px-2 py-2 mx-0 w-[37px] bg-gray-200 rounded-md text-center'}>{pitch}</div>
     ))}
    </div>

    <div>Alterations</div>
    <div className={'flex flex-wrap max-w-[200px] justify-center'}>
     {alterations.map(({ noteIndex, change, note }) => {
      const the = mapChangeToSymbol[(change ?? 0) * 2 + 2] + noteIndex.toString()
      return <div key={the}
                  onClick={() => setSelected((pre) =>
                    pre.includes(note) ? pre : [...pre, note]
                  )}
                  className={`${selected.includes(note) ? 'bg-blue-400' : 'bg-gray-400'}
														rounded-md px-2 py-1 m-2 flex justify-center items-center`}>
       {the} <span className={'text-xs'}>({note})</span>
      </div>
     })}
    </div>
   </div>
 );
};

export default AChordCard;