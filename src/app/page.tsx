"use client"
import { useMemo, useState } from "react";
import { createScaleFromMajor, HarmonicMinorAccidental, Liaghat } from "@/Concepts/ScaleConstruction";
import DisplayScale from "@/Components/Scales/DisplayScale";
import { createAllPossibleChordsInRootScale } from "@/Concepts/ChordConstruction";

const App = () => {
	const [root, setRoot] = useState("E");
	const scale = useMemo(() => createScaleFromMajor(Liaghat, root), [root]);
	console.log(scale);

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
			</div>
		</div>
	);
}

export default App;
