"use client"
import { useMemo, useState } from "react";
import {
	createScale,
	createScaleFromMajor, MajorScale, note,
	PhrygianDominantAccidental
} from "@/Concepts/ScaleConstruction";
import DisplayScale from "@/Components/Scales/DisplayScale";
import { createAllPossibleChordsInRootScale } from "@/Concepts/ChordConstruction";
import Notes from "@/Components/Neck/Notes";
import { algorithm } from "@/Concepts/lizzio/concept";

const App = () => {
	const [root, setRoot] = useState("G");
	// const scale = useMemo(() => createScale(MajorScale, root), [root]);
	const [selected, setSelected] = useState<note[]>([]);
	const scale = useMemo(() => createScaleFromMajor(PhrygianDominantAccidental, root), [root]);

	return (
		<div className='resume-bg w-[1300px] m-auto flex justify-center'>
			<div className='relative font-lato-meduim flex flex-col h-[1650px] mt-16 max-w-[1300px]'>
				<DisplayScale notes={scale}/>
				<div className={"my-2"}>{scale.map((note) =>
					<div key={note} className={"flex items-center my-4"}>
						{createAllPossibleChordsInRootScale(note, scale).map(({ chordName, notes }) =>
							<div className={'flex items-end'} key={`${note}${chordName}`}>
								<div className={'flex flex-col justify-start'}>
									<div className={"w-[37px] px-2 py-1"} onClick={() => setSelected(notes)}>{note}{chordName}:</div>
									<DisplayScale notes={notes}/>
								</div>
								<div className={'h-[32px] w-[1px] bg-black'}/>
							</div>
						)}
					</div>
				)}</div>

				<div className={"mt-8"}>
					<Notes selected={selected} setSelected={setSelected} scale={scale}
								 strings={["E", "A", "D", "G", "B", "E"].reverse() as note[]}/>
				</div>
			</div>
		</div>
	);
}

export default App;
