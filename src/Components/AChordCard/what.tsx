import { secondaryDominant } from "@/Concepts/lizzio/chords/utils";
import { mapChangeToSymbol } from "@/Concepts/lizzio/chords";

const What = ({ note, possibles, alterations, selected, setSelected }) => {
	const chords = Object.keys(possibles)

	if (!chords.length) {
		return
	}

	return (
		<div className={'flex items-center card p-6'}>
			<div className={'flex gap-6 items-center text-center'}>
				<div className={'flex flex-col'}>
					{chords.map((name) => (
						<div className={'h-[48px] flex items-center'} key={name}
								 onClick={() => setSelected(possibles[name]?.notes)}>{note}{possibles[name].symbol}</div>
					))}
				</div>
				<div className={'flex flex-col'}>
					{chords.map((name) =>
						<div key={note + name} className={`flex flex-row items-center h-[48px]`}>
							{possibles[name]?.notes.map((pitch, index) =>
								<div onClick={() =>
									index >= 2 && setSelected(possibles[name]?.notes.slice(0, index + 1))
								} key={pitch}
										 className={`${selected.includes(pitch) ? 'bg-blue-200' : ''}
														rounded-md px-2 py-1 m-2 w-[37px] flex justify-center items-center`}>{pitch}</div>
							)}
						</div>
					)}
				</div>
			</div>

			<div className={'w-full h-1 border-dotted border-b-1'}></div>

			<div className={'mt-4'}> - - - - - - -</div>

			<div className={'flex gap-2 items-center mt-2 mb-6'}>
				{/*secondary dominant:*/}
				V7:
				{secondaryDominant(note).map((pitch) => (
					<div key={pitch} className={'px-2 py-2 mx-0 w-[37px] bg-gray-200 rounded-md text-center'}>{pitch}</div>
				))}
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
		</div>
	);
};

export default What;