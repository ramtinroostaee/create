'use client'

import { algorithm } from "@/Concepts/lizzio/concept";
import { useCallback, useEffect, useMemo, useState } from "react";
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

type Params = {note: note; scale: 'Major' | 'HarmonicMinor'; mode: number}

const Lizzio = ({ params }: Params) => {
	const scale = useMemo(() => modeScale(scales[params.scale], params.note, params.mode), [params]);

	const [selected, setSelected] = useState<note[]>([]);

	const AChords = useMemo(() =>
			scale.map((pitch) => ({
				...algorithm(scale, pitch), note: pitch
			}))
		, [scale])

	useEffect(() => {
		const the = {}

		scale.forEach((pitch) => {
			the[pitch] = 0
		})

		console.log(AChords)
		AChords.map(({possibles}) => Object.keys(possibles).forEach((name) => {
			possibles[name].notes.forEach((pitch) => {
				the[pitch]++
			})
		}))
		console.log(the)
	}, [scale, AChords]);

	const selectNote = useCallback((pitch) => stackNotes(pitch, setSelected), []);

	return (<div className='resume-bg max-w-[1300px] m-auto'>
		<div className='relative font-lato-meduim h-[1650px] pt-0 max-w-[1300px]'>
			<div className={'flex justify-center w-[400px] mx-auto pt-4'}>
				<div className={'card p-2'}>{params.note} {Modes[params.scale][params.mode - 1]}</div>
			</div>
			<div className={"mt-4"}>
				<Notes selected={selected} selectNote={selectNote} scale={scale}
							 strings={["E", "A", "D", "G", "B", "E"].reverse() as note[]}/>
			</div>

			<div className={'flex overflow-x-auto px-10 gap-6 mt-8'}>
				{AChords.map((stuff) =>
					<AChordCard key={stuff.note} {...stuff} setSelected={setSelected} selected={selected}/>)}
			</div>
		</div>
	</div>);
};

export default Lizzio;