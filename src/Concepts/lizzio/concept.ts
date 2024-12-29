import { createScale, intervalNote, MajorScale, note, notes } from "@/Concepts/ScaleConstruction";
import { allChords, } from "@/Concepts/lizzio/chords";
import {
	add,
	createChord,
	cutChangeNo,
	findNote,
	intervalIncludes,
	sortInterval
} from "@/Concepts/lizzio/chords/utils";

const findDistance = (noteOne: note, noteTwo: note) => {
	const the =
		(notes.findIndex((note) => noteOne === note) -
			notes.findIndex((note) => noteTwo === note)) / 2

	if (the > 1) {
		return the - 6
	} else if (the < -1) {
		return the + 6
	} else return the
}

const findIntervals = (baseScale: note[], majorScale: note[]) => {
	const the: intervalNote[] = [{ noteIndex: 1 }]

	for (let i = 1; i < 7; i++) {
		const noteIndex = i % 2 ? i + 8 : i + 1

		baseScale.forEach((base) => {
			if (base === majorScale[i]) {
				the.push({ noteIndex })
			} else {
				const distance = findDistance(base, majorScale[i])
				if (Math.abs(distance) <= 0.5) {
					the.push({ noteIndex, change: distance as (0.5 | -0.5) })
				}
			}
		})
	}

	return sortInterval(the)
}

export const algorithm = (scale: note[], root: note) => {
	const rootMajor = createScale(MajorScale, root)
	const allIntervals = findIntervals(scale, rootMajor)

	const possibles = {}
	const lengths = []

	Object.keys(allChords).forEach((name) => {
		const addsInclude = intervalIncludes(allIntervals, allChords[name]?.add ?? [])
		let ok = true
		addsInclude.forEach((includes) => {
			ok = ok && includes
		})

		if (ok) {
			/* intervalCutChangeNo */
			const ICCN = cutChangeNo(allChords[name])

			/* intervalCutChangeNoIncludes */
			const ICCNI = intervalIncludes(allIntervals, ICCN)
			let no = []
			ICCNI.forEach((includes, index) => !includes && no.push(ICCN[index].noteIndex))

			let index = 0

			for (let done = false; index < ICCNI.length && !done;) {
				ICCNI[index] ? ++index : done = true
			}

			if (index >= (3 - (allChords[name]?.no?.length ?? 0))) {
				const interval = ICCN.slice(0, index)

				/* MaxPossibleNoteIndex */
				const MPNI = ICCN[index - 1].noteIndex

				lengths.push(MPNI)
				const the = MPNI === 5 ? '' : MPNI
				const symbol = name.includes('sus') ?
					`${the}${name}` :
					`${name}${the}`
				const allInterval = add(interval, allChords[name]?.add ?? [])

				possibles[name] = {
					interval: allInterval,
					notes: createChord(root, allInterval),
					symbol
				}
			} else if (no.length <= 2) {
				console.log(root, no, name)
			}
		}
	})

	const alterations = allIntervals.filter(({ noteIndex, change }) =>
		noteIndex >= 5 && noteIndex !== 7
	).map((interval) =>
		({ ...interval, note: findNote(rootMajor, interval) })
	)
	// 	.sort((a, b) =>
	// 	b.noteIndex - a.noteIndex
	// ).filter(({ note, noteIndex }) =>
	// 	notes.includes(note) ? false : notes.push(note)
	// )

	return {
		possibles,
		alterations,
		max: lengths.sort((a, b) => a - b).reverse()[0]
	}
}
