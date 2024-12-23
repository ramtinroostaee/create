'use client'

import { algorithm } from "@/Concepts/lizzio/concept";
import { useMemo, useState } from "react";
import {
	createScale,
	createScaleFromMajor,
	MajorScale,
	note,
	PhrygianDominantAccidental
} from "@/Concepts/ScaleConstruction";
import { mapChangeToSymbol, mapLengthToName } from "@/Concepts/lizzio/chords";
import Notes from "@/Components/Neck/Notes";

const Lizzio = () => {
	const [root, setRoot] = useState("G");
	// const scale = useMemo(() => createScale(MajorScale, root), [root]);
	const [selected, setSelected] = useState<note[]>([]);
	const scale = useMemo(() => createScaleFromMajor(PhrygianDominantAccidental, root), [root]);
	const alg = useMemo(() =>
			scale.map((pitch) => ({
				...algorithm(scale, pitch), note: pitch
			}))
		, [scale])

	return (<div className='resume-bg max-w-[1300px] m-auto'>
		<div className='relative font-lato-meduim h-[1650px] pt-16 max-w-[1300px]'>
			<div className={"flex justify-center"}>{scale.map((note) =>
				<div key={note} className={"bg-gray-400 rounded-md w-[37px] text-center px-2 py-1 mx-2"}>
					{note}
				</div>)}
			</div>
			<div className={"mt-4"}>
				<Notes selected={selected} setSelected={setSelected} scale={scale}
							 strings={["E", "A", "D", "G", "B", "E"].reverse() as note[]}/>
			</div>
			<div className={'flex flex-wrap px-10 gap-6 mt-8 justify-center'}>
				{alg.map(({ note, possibles, alterations, max }) =>
					<div key={note} className={'flex flex-col items-center card p-6'}>
						<div className={'flex gap-6 text-center'}>
							{Object.keys(possibles).map((name) =>
								<div key={note + name} className={`flex flex-col`}>
									<div onClick={() => setSelected(possibles[name]?.notes)}>{note}{possibles[name].symbol}</div>

									{possibles[name]?.notes.map((pitch, index) =>
										<div onClick={() =>
											index >= 2 && setSelected(possibles[name]?.notes.slice(0, index + 1))
										} key={pitch}
												 className={`${selected.includes(pitch) ? 'bg-blue-200' : ''}
														rounded-md px-2 py-1 m-2 flex justify-center items-center`}>{pitch}</div>
									)}
								</div>
							)}
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
					</div>)}
			</div>
		</div>
	</div>);
};

export default Lizzio;