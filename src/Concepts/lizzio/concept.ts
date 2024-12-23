import { createScale, intervalNote, MajorScale, note, notes } from "@/Concepts/ScaleConstruction";
import { allChords, createChord, findNote, intervalIncludes, mapLengthToName } from "@/Concepts/lizzio/chords";

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

		baseScale.forEach((base, index) => {
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
	the.sort((a, b) => a.noteIndex + (a.change ?? 0) - b.noteIndex - (b.change ?? 0))

	return the
}

export const algorithm = (scale: note[], root: note) => {
	const rootMajor = createScale(MajorScale, root)
	const allIntervals = findIntervals(scale, rootMajor)

	const possibles = {}
	const lengths = []

	Object.keys(allChords).forEach((name) => {
		const the = intervalIncludes(allIntervals, allChords[name])
		let index = 0

		for (let done = false; index < the.length && !done;) {
			the[index] ? ++index : done = true
		}

		if (index >= 3) {
			const interval = allChords[name].slice(0, index)
			const length = mapLengthToName[index]
			lengths.push(length)
			const symbol = name.includes('sus') ?
				`${length}${name}` :
				`${name}${length}`

			possibles[name] = { interval, notes: createChord(root, interval), symbol }
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
