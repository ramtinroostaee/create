import { createScale, intervalNote, MajorScale, note, notes } from "@/Concepts/ScaleConstruction";

export const dominant: intervalNote[] = [
	{ noteIndex: 1 },
	{ noteIndex: 3 },
	{ noteIndex: 5 },
	{ noteIndex: 7, change: -0.5 },
	{ noteIndex: 9 },
	{ noteIndex: 11 },
	{ noteIndex: 13 }
]

export const cut = (intervals: intervalNote[], noteIndex: 3 | 5 | 7 | 9 | 11 | 13) =>
	dominant.slice(0,
		dominant.findIndex((note) => note.noteIndex === noteIndex) + 1
	)

// distanceFromRoot
const distance = [0, 1, 2, 2.5, 3.5, 4.5, 5.5]
export const mapToDistance = (index: number) =>
	distance[index > 7 ? index - 8 : index - 1]

export const intervalIncludes = (intervals: intervalNote[], includes: intervalNote[]) =>
	includes.map((entry) =>
		intervals.findIndex(interval =>
			(mapToDistance(interval.noteIndex) + (interval.change ?? 0))
			=== (mapToDistance(entry.noteIndex) + (entry.change ?? 0))
		) > -1
	)

export const alteration = (
	intervals: intervalNote[],
	changes: {
		noteIndex: number,
		change: -0.5 | 0.5 | -1 | 1
	} []
) => {
	const the = [...intervals]
	changes.forEach(({ change, noteIndex }) => {
		const intervalIndex = intervals.findIndex((interval) => interval.noteIndex === noteIndex)

		if (intervalIndex > -1) {
			the[intervalIndex] = { noteIndex, change: (intervals[intervalIndex].change ?? 0) + change }
		}
	})

	return the
}

export const findNote = (scale: note[], interval: intervalNote) => {
	const { noteIndex, change } = interval

	let note = scale[(noteIndex - 1) % 7];

	if (change) {
		const chordNoteIndex = notes.findIndex((pitch) => note === pitch);
		note = notes[(chordNoteIndex + change * 2 + 12) % 12];
	}
	return note
}

export const createChord = (root: note, intervals: intervalNote[]) => {
	const rootMajor = createScale(MajorScale, root)

	return intervals.map((interval) => findNote(rootMajor, interval))
}

export const major = alteration(dominant, [{ noteIndex: 7, change: 0.5 }])
export const minor = alteration(dominant, [{ noteIndex: 3, change: -0.5 }])
export const diminished = alteration(cut(dominant, 11), [
	{ noteIndex: 7, change: -0.5 },
	{ noteIndex: 5, change: -0.5 },
	{ noteIndex: 3, change: -0.5 }
])

export const augmented = alteration(dominant, [{ noteIndex: 5, change: 0.5 }])

export const sus2: intervalNote[] = [
	{ noteIndex: 1 },
	{ noteIndex: 9 },
	{ noteIndex: 5 },
	{ noteIndex: 7, change: -0.5 },
]

export const sus4: intervalNote[] = [
	{ noteIndex: 1 },
	{ noteIndex: 11 },
	{ noteIndex: 5 },
	{ noteIndex: 7, change: -0.5 },
]

export const allChords = {
	'': dominant,
	maj: major,
	m: minor,
	dim: diminished,
	aug: augmented,
	sus2,
	sus4,
}

export const mapLengthToName = {
	3: '',
	4: '7',
	5: '9',
	6: '11',
	7: '13'
}

export const mapChangeToSymbol = {
	0: '♭♭',
	1: '♭',
	2: '',
	3: '♯',
	4: '♯♯'
}
