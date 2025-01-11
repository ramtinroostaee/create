'use client'

import { algorithm } from "@/Concepts/lizzio/concept";
import { useCallback, useMemo, useState } from "react";
import { note } from "@/Concepts/ScaleConstruction";
import Notes from "@/Components/Neck/Notes";
import { Modes, modeScale, scales } from "@/Concepts/lizzio/modes";
import { clone } from "@/Components/utils";
import AChordCard from "@/Components/AChordCard";

const stackNotes = (theNote: note, set) => set(pre => {
	const prev: note[] = clone(pre);
	const index = prev.indexOf(theNote);
	if (index > -1) {
		prev.splice(index, 1);
		return prev;
	} else return [...prev, theNote];
})

const ChordProgression: (1 | 2 | 3 | 4 | 5 | 6 | 7)[] = [1, 2, 6, 5]

const Lizzio = () => {
	const [root, setRoot] = useState({ note: 'G', scale: 'HarmonicMinor', mode: 1 });
	const scale = useMemo(() => modeScale(scales[root.scale], root.note, 1), [root]);

	const cushScale = useMemo(() => modeScale(scales[root.scale], 'G#', 1), [root]);

	const [selected, setSelected] = useState<note[]>([]);

	const AChords = useMemo(() =>
			ChordProgression.map((CNum) => scale[CNum - 1]).map((pitch) => ({
				...algorithm(scale, pitch), note: pitch
			}))
		, [scale])

	const cushAChords = useMemo(() =>
			ChordProgression.map((CNum) => cushScale[CNum - 1]).map((pitch) => ({
				...algorithm(cushScale, pitch), note: pitch
			}))
		, [scale])

	const selectNote = useCallback((pitch) => stackNotes(pitch, setSelected), []);

	return (<div className='resume-bg max-w-[1300px] m-auto'>
		<div className='relative font-lato-meduim h-[1650px] {/*pt-16*/} pt-0 max-w-[1300px]'>
			{/*<div className={"flex justify-center"}>{scale.map((note) =>*/}
			{/*	<div key={note} className={"bg-gray-400 rounded-md w-[37px] text-center px-2 py-1 mx-2"}>*/}
			{/*		{note}*/}
			{/*	</div>)}*/}
			{/*</div>*/}
			<div className={'flex justify-between w-[400px] mx-auto'}>
				<div>root: {root.note}</div>
				<div>scale: {root.scale}</div>
				<div>mode: {Modes[root.scale][root.mode]}</div>
			</div>
			<div className={"mt-4"}>
				<Notes selected={selected} selectNote={selectNote} scale={scale}
							 strings={["E", "A", "D", "G", "B", "E"].reverse() as note[]}/>
			</div>

			<div className={'flex overflow-x-auto px-10 gap-6 mt-8'}>
				{AChords.map((stuff) =>
					<AChordCard key={stuff.note} {...stuff} setSelected={setSelected} selected={selected}/>)}
			</div>
			<div className={'flex overflow-x-auto px-10 gap-6 mt-8'}>
				{cushAChords.map((stuff) =>
					<AChordCard key={stuff.note} {...stuff} setSelected={setSelected} selected={selected}/>)}
			</div>

		</div>
	</div>);
};

export default Lizzio;