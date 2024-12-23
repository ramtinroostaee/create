import { useCallback, useEffect, useState } from "react";
import { note, notes } from "@/Concepts/ScaleConstruction";
import { clone } from "@/Components/utils";
import { findChord, humanReadableChord } from "@/Concepts/ChordConstruction";
import DisplayScale from "@/Components/Scales/DisplayScale";

const Notes = ({ scale, strings, selected, setSelected }: {scale: note[], strings: note[]}) => {

	const [possibleChords, setPossibleChords] = useState<humanReadableChord[]>([]);

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

	useEffect(() => {
		setPossibleChords(selected.length ? findChord(selected, scale) : []);
	}, [selected, scale]);

	return (
		<div className={"flex items-start flex-col mx-auto w-[481px]"}>
			<div className={"flex text-center"}>{stringRow('E').map((note, i) => <div
				key={`${note}${i}`}
				className={'px-2 py-2 mx-0 w-[37px]'}>{i}</div>)}</div>
			{strings.map((string, index) =>
				<div key={`${string}${index}`} className={"flex text-center"}>

					{stringRow(string).map((note, i) => {
							const show = scale.includes(note);
							const highlight = selected.includes(note);
							let style = { bg: '', text: '' };
							style.bg = i === 0 ? "" : show ? "bg-gray-200" : "bg-gray-600";
							if (highlight && show) {
								style.bg = "bg-blue-600"
							}
							if (highlight) {
								style.text = !show ? 'text-red-500' : 'text-white';
							}

							return <div key={`${note}${index}${i}`}
													onClick={() => selectNote(note)}
													className={`px-2 py-2 mx-0 w-[37px] ${style.bg} ${style.text}`}>
								{show ? note : ""}
							</div>
						}
					)}
				</div>)}
			{/*{possibleChords?.map(({ chordName, root, notes }) =>*/}
			{/*	<div className={'flex items-end'} key={`${root}${chordName}`}>*/}
			{/*		<div className={'flex flex-col justify-start'}>*/}
			{/*			<div className={"w-[37px] px-2 py-1"}>{root}{chordName}:</div>*/}
			{/*			<DisplayScale notes={notes}/>*/}
			{/*		</div>*/}
			{/*		<div className={'h-[32px] w-[1px] bg-black'}/>*/}
			{/*	</div>*/}
			{/*)}*/}
		</div>
	);
}

export default Notes;