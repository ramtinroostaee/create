import { createScale, intervalNote, MajorScale, note, notes } from "@/Concepts/ScaleConstruction";
import { allChords, } from "@/Concepts/lizzio/chords";
import {
	add,
	alterChanges,
	createChord,
	cutChangeNo,
	findNote,
	intervalIncludes,
	sortInterval
} from "@/Concepts/lizzio/chords/utils";

export const algorithm = (scale: note[], root: note) => {
	const rootMajor = createScale(MajorScale, root)
	const allIntervals = findIntervals(scale, rootMajor)

	const possibles = {}
	const lengths = []

	Object.keys(allChords).forEach((name) => {
		const addsInclude = intervalIncludes(allIntervals, allChords[name]?.add ?? [])

		let ok = true
		const changes = allChords[name]?.changes ?? []

		if (changes?.length <= 2) {
			intervalIncludes(allIntervals, alterChanges(changes))
				.forEach((includes) => {
					ok = ok && includes
				})
		}

		addsInclude.forEach((includes) => {
			ok = ok && includes
		})

		if (ok) {
			/* intervalCutChangeNo */
			const ICCN = cutChangeNo(allChords[name])

			/* intervalCutChangeNoIncludes */
			const ICCNI = intervalIncludes(allIntervals, ICCN)

			/* MinimumValuableChord */
			const MVC = allChords[name]?.minValuableChord ?? 3

			let no = []
			ICCNI.forEach((includes, index) => !includes && no.push(index))
			no = no.slice(0, 2)

			let pass = no.length ? (no[0] + (allChords[name]?.no?.length ?? 0)) >= MVC : true

			/* MaxPossibleNoteIndex */
			let MPNI = no.length ? ICCN[no[0] - 1].noteIndex : ICCN[ICCN.length - 1].noteIndex

			if (!allChords[name]?.no?.length && no.length) {
				if (no.length === 1) {
					pass = (ICCN.length - 1 + (allChords[name]?.no?.length ?? 0)) >= MVC
					MPNI = ICCN[ICCN.length - 1].noteIndex
				} else if (ICCN[no[1]].noteIndex - ICCN[no[0]].noteIndex >= 4) {
					pass = (no[1] - 1 + (allChords[name]?.no?.length ?? 0)) >= MVC
					if (pass) {
						MPNI = ICCN[no[1] - 1].noteIndex
					}
				}
			}
			// pass && console.log(root, name, ICCNI)

			if (pass) {
				const interval = ICCN.filter((interval, index) =>
					interval.noteIndex <= MPNI && index !== (no.length ? no[0] : -1))

				lengths.push(interval.length)
				const numberSymbol = MPNI === 5 ? '' : MPNI

				const noIndex = no.length ? ICCN[no[0]].noteIndex : 13
				const noSymbol = noIndex < MPNI ? 'no(' + noIndex + ')' : ''

				const symbol = name.includes('sus') ?
					`${numberSymbol}${name}${noSymbol}` :
					`${name}${numberSymbol}${noSymbol}`
				const allInterval = add(interval, allChords[name]?.add ?? [])

				possibles[name] = {
					interval: allInterval,
					notes: createChord(root, allInterval),
					symbol
				}
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
