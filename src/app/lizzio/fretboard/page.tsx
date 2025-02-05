'use client'
import { useCallback, useMemo, useState } from "react";
import { note, notes } from "@/Concepts/ScaleConstruction";
import { clone } from "@/Components/utils";
import { algorithm } from "@/Concepts/lizzio/concept";
import What from "@/Components/AChordCard/what";

const strings: note[] = ["E", "B", "G", "D", "A", "E"]

const FretBoard = () => {
	// ['F#', 'A#', 'C#']
	const [selected, setSelected] = useState<note[]>(['F#', 'A#', 'C#']);

	const stringRow = useCallback((string: note) => {
		const stringIndex = notes.findIndex((note) => note === string);

		return [...notes.slice(stringIndex), ...notes.slice(0, stringIndex), string]
	}, []);

	const selectNote = useCallback((theNote: note) => setSelected(pre => {
		const prev: note[] = clone(pre);
		const index = prev.indexOf(theNote);
		if (index > -1) {
			prev.splice(index, 1);
			return prev;
		} else return [...prev, theNote];
	}), []);

	const AChords = useMemo(() =>
			selected.map((pitch) => ({
				...algorithm(selected, pitch), note: pitch
			}))
		, [selected])

	return (
		<div className={'mt-4 max-w-[1600px] mx-auto'}>
			<div className={"flex items-start flex-col mx-auto w-[481px]"}>
				<div className={"flex text-center"}>{stringRow('E').map((note, i) => <div
					key={`${note}${i}`}
					className={'px-2 py-2 mx-0 w-[37px]'}>{i}</div>)}</div>
				{strings.map((string, index) =>
					<div key={`${string}${index}`} className={"flex text-center"}>

						{stringRow(string).map((note, i) => {
								const highlight = selected.includes(note);
								let style = { bg: '', text: '' };
								style.bg = i === 0 ? "" : "bg-gray-200"
								if (highlight) {
									style.bg = "bg-blue-600"
								}

								return <div key={`${note}${index}${i}`}
														onClick={() => selectNote(note)}
														className={`px-2 py-2 mx-0 w-[37px] ${style.bg} ${style.text}`}>
									{note}
								</div>
							}
						)}
					</div>)}
				<div className={'mt-4'}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
					- - - - - - -
				</div>
				<div className={'flex justify-between w-full'}>{notes.map((pitch) =>
					<div
						key={pitch}
						className={`w-[37px] items-center flex justify-center h-[37px] rounded-lg cursor-pointer ${
							selected.includes(pitch) ?
								"bg-blue-600" :
								"bg-gray-200"
						}`}
						onClick={() => selectNote(pitch)}
					>
						{pitch}
					</div>)}
				</div>
				<div className={'mb-4'}> - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
					- - - - - - -
				</div>
			</div>

			<div className={'flex overflow-x-auto mx-auto w-full px-10 gap-6 mt-8'}>
				{AChords.map((stuff) =>
					<What key={stuff.note} {...stuff} setSelected={setSelected} selected={selected}/>)}
			</div>
		</div>
	);
};

export default FretBoard;
