"use client"
import { useMemo, useState } from "react";
import { createScaleFromMajor, HarmonicMinorAccidental, Liaghat } from "@/Concepts/ScaleConstruction";
import DisplayScale from "@/Components/Scales/DisplayScale";
import { createAllPossibleChordsInRootScale } from "@/Concepts/ChordConstruction";
import Notes from "@/Components/Neck/Notes";

const App = () => {
	const [root, setRoot] = useState("E");
	const scale = useMemo(() => createScaleFromMajor(Liaghat, root), [root]);

	return (
		<div className='resume-bg w-[1300px] m-auto flex justify-center'>
			<div className='relative font-lato-meduim flex flex-col h-[1650px] mt-16 max-w-[1300px]'>
				<DisplayScale notes={scale}/>
				<div className={"my-2"}>{scale.map((note) =>
					<div key={note} className={"flex items-center my-4"}>
						{createAllPossibleChordsInRootScale(note, scale).map(({ chordName, notes }) => <div key={chordName}>
							<div className={"w-[37px]"}>{note}{chordName}:</div>
							<DisplayScale notes={notes}/></div>)}
					</div>
				)}</div>

				<div className={"mt-8"}>
					<Notes scale={scale} strings={["E", "A", "D", "G", "B", "E"]} />
				</div>
			</div>
		</div>
	);
}

export default App;
