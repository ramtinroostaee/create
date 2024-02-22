import { useCallback, useMemo } from "react";
import { notes } from "@/Concepts/ScaleConstruction";

const Notes = ({ scale, strings }) => {

	const stringRow = useCallback((string) => {
		const stringIndex = notes.findIndex((note) => note === string);

		return [...notes.slice(stringIndex), ...notes.slice(0, stringIndex), string]
	}, []);

	return (
		<div className={"flex items-start flex-col mx-auto w-[481px]"}>{strings.map((string, index) =>
			<div key={index} className={"flex text-center"}>
				{stringRow(string).map((note, i) => {
						const show = scale.includes(note)
						return <div key={i}
												className={`px-2 py-2 mx-0 w-[37px] ${i === 0 ? "" : show ? "bg-blue-600" : "bg-gray-400"}`}>
							{show ? note : ""}
						</div>
					}
				)}
			</div>)}
		</div>
	);
}

export default Notes;