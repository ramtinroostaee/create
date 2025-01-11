'use client'

import { useCallback, useMemo, useState } from "react";
import { note } from "@/Concepts/ScaleConstruction";
import Notes from "@/Components/Neck/Notes";
import { Modes, modeScale, scales } from "@/Concepts/lizzio/modes";
import { clone } from "@/Components/utils";
import { algorithm } from "@/Concepts/lizzio/concept";
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
type progression = (1 | 2 | 3 | 4 | 5 | 6 | 7)[]
const all: progression = [1, 2, 3, 4, 5, 6, 7]

const Lizzio = ({ params }: Params) => {
	const [type, setType] = useState('cush')
	const [cushMode, setCushMode] = useState(0)
	const [selected, setSelected] = useState<note[]>([]);
	const [ChordProgression, setChordProgression] = useState<progression>([1]);
	const scale = useMemo(() => modeScale(scales[params.scale], params.note, params.mode), [params]);
	const [Base, setBase] = useState<'Major' | 'HarmonicMinor'>(params.scale)

	const ChangeBase = useCallback(() => setBase((pre) =>
		pre === 'Major' ? 'HarmonicMinor' : 'Major'
	), [])

	const cushScale = useMemo<note[]>(() => {
		if (cushMode) {
			if (type === 'parallel') {
				return modeScale(scales[Base], params.note, cushMode)
			} else if (type === 'cush') {
				const the = modeScale(scales[Base], params.note, cushMode)

				for (let index = (params.mode - cushMode + 7) % 7; index; --index) {
					the.push(the[0])
					the.shift()
				}

				return the
			}
		}
	}, [params, type, cushMode, Base]);

	const AChords = useMemo(() =>
			ChordProgression.map((CNum) => scale[CNum - 1]).map((pitch) => ({
				...algorithm(scale, pitch), note: pitch
			}))
		, [scale, ChordProgression])

	const cushAChords = useMemo(() =>
			cushScale ? ChordProgression.map((CNum) => cushScale[CNum - 1]).map((pitch) => ({
				...algorithm(cushScale, pitch), note: pitch
			})) : []
		, [cushScale, ChordProgression])

	const selectNote = useCallback((pitch) => stackNotes(pitch, setSelected), []);
	const selectProgress = useCallback((pitch) => stackNotes(pitch, setChordProgression), []);

	return (<div className='resume-bg max-w-[1300px] m-auto'>
		<div className='relative font-lato-meduim h-[1650px] pt-0 max-w-[1300px]'>
			<div className={'flex justify-center w-[400px] mx-auto pt-4'}>
				<div className={'card p-2'}>{params.note} {Modes[params.scale][params.mode - 1]}</div>
			</div>

			<div className={'flex justify-between mt-4 w-[400px] mx-auto text-center'}>
				{all.map((name) =>
					<div
						className={`flex justify-center w-10 h-10 cursor-pointer ${ChordProgression.includes(name) ? 'card' : ''}`}
						key={name}
						onClick={() => selectProgress(name)}>
						{name}
					</div>
				)}
			</div>

			<div className={'flex justify-between w-[400px] mx-auto'}>
				<div onClick={() => setType('parallel')}
						 className={`${type === 'parallel' ? 'card' : ''} p-2 cursor-pointer`}
				>parallel
				</div>
				<div className={`${Base !== params.scale ? 'card' : ''} p-2 cursor-pointer`}
						 onClick={ChangeBase}>CHANGE
				</div>
				<div onClick={() => setType('cush')}
						 className={`${type === 'cush' ? 'card' : ''} p-2 cursor-pointer`}
				>cush
				</div>
			</div>

			<div className={'flex justify-between mt-4 w-[1000px] mx-auto text-center'}>
				{Modes[Base].map((name, index) =>
					<div className={`p-2 cursor-pointer ${cushMode === index + 1 ? 'card' : ''}`} key={name}
							 onClick={() => setCushMode(index + 1)}>
						{name}
					</div>
				)}
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
