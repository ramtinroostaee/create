'use client'

import { algorithm } from "@/Concepts/lizzio/concept";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HarmonicMinorScale, MajorScale, note, notes } from "@/Concepts/ScaleConstruction";
import Notes from "@/Components/Neck/Notes";
import { distanceFitsMode, Modes, modeScale, scales } from "@/Concepts/lizzio/modes";
import { clone } from "@/Components/utils";
import AChordCard from "@/Components/AChordCard";
import Link from "next/link";

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

		// console.log(AChords)
		AChords.map(({ possibles }) => Object.keys(possibles).forEach((name) => {
			possibles[name].notes.forEach((pitch) => {
				the[pitch]++
			})
		}))
		// console.log(the)
	}, [scale, AChords]);

	const Links = useMemo(() => {
		if (selected.length > 2) {
			const sorted = [...selected]
			sorted.sort((a, b) =>
				notes.findIndex((note) => a === note) -
				notes.findIndex((note) => b === note))
			// console.log(sorted)

			const distances = []
			for (let i = 0; i < sorted.length - 1; i++) {
				distances.push(
					(distances[i - 1] ?? 0) +
					(notes.findIndex((note) => sorted[i + 1] === note) -
						notes.findIndex((note) => sorted[i] === note)) / 2
				)
			}

			return [
				...distanceFitsMode(distances, MajorScale).map((mode) => {
					console.log(modeScale(MajorScale, sorted[0], mode))
					const index = modeScale(MajorScale, sorted[0], mode)
						.findIndex((pitch) => pitch === params.note)

					if (index > -1) {
						const DMode = (mode + index) % 7
						return {
							link: `/lizzio/${params.note}/Major/${DMode}`,
							name: `D ${Modes.Major[DMode - 1]}`
						}
					} else return {
						link: `/lizzio/${sorted[0]}/Major/${mode}`,
						name: `${sorted[0]} ${Modes.Major[mode - 1]}`
					}
				})
				,
				...distanceFitsMode(distances, HarmonicMinorScale).map((mode) =>
					modeScale(HarmonicMinorScale, sorted[0], mode)[((5 - mode + 7) % 7)]
				).map((note) => ({
						link: `/lizzio/${note}/HarmonicMinor/5`,
						name: `${note} Phrygian Dominant`
					})
				)
			]
		}
	}, [selected, params]);

	const selectNote = useCallback((pitch) => stackNotes(pitch, setSelected), []);

	return (<div className='resume-bg max-w-[1300px] m-auto'>
		<div className='relative font-lato-meduim h-[1650px] pt-0 max-w-[1300px]'>
			<div className={'flex justify-center w-[400px] mx-auto py-4'}>
				<div className={'card p-2'}>{params.note} {Modes[params.scale][params.mode - 1]}</div>
			</div>
			<div className={"flex justify-center"}>{scale.map((note) =>
				<div key={note} className={"bg-gray-300 rounded-md w-[37px] text-center px-2 py-1 mx-2"}>
					{note}
				</div>)}
			</div>
			<div className={"mt-4"}>
				<Notes selected={selected} selectNote={selectNote} scale={scale}
							 strings={["E", "A", "D", "G", "B", "E"].reverse() as note[]}/>
			</div>

			<div className={'flex overflow-x-auto px-10 gap-6 mt-8'}>
				{AChords.map((stuff) =>
					<AChordCard key={stuff.note} {...stuff} setSelected={setSelected} selected={selected}/>)}
			</div>

			<div className={'flex overflow-x-auto justify-center p-10 gap-6 mt-8'}>
				{Links?.map(({ link, name }) =>
					<Link key={name} className={'card p-2'} href={link}>{name}</Link>
				)}
			</div>
		</div>
	</div>);
};

export default Lizzio;
