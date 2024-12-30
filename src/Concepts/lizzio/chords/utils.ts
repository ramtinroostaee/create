import { createScale, intervalNote, MajorScale, note, notes } from "@/Concepts/ScaleConstruction";
import { AChord, dominant } from "@/Concepts/lizzio/chords/index";

export type noteIndexes = 3 | 5 | 7 | 9 | 11 | 13

export const alteration = (
	intervals: intervalNote[],
	changes: intervalNote[]
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

export const cut = (intervals: intervalNote[], noteIndex: noteIndexes) =>
	dominant.slice(0,
		dominant.findIndex((note) => note.noteIndex === noteIndex) + 1
	)

export const no = (intervals: intervalNote[], indexes: noteIndexes[]) => {
	let the = [...intervals]
	indexes.forEach((index) => {
			the = the.filter((interval) => interval.noteIndex !== index)
		}
	)

	return the
}

export const add = (intervals: intervalNote[], interval: intervalNote[]) =>
	sortInterval([...intervals, ...interval])

export const cutChangeNo = (achord: AChord) => {
	let the = [...dominant]
	if (achord.cut) {
		the = cut(the, achord.cut)
	}

	if (achord.changes) {
		the = alteration(the, achord.changes)
	}

	if (achord.no) {
		the = no(the, achord.no)
	}

	return the
}

export const createAChord = (achord: AChord) => {
	let the = cutChangeNo(achord)

	if (achord.add) {
		the = add(the, achord.add)
	}

	return the
}

// this may not be perfect
export const combineAChords = (one: AChord, two: AChord) => ({
	changes: sortInterval([...one.changes, ...two.changes]),
	minValuableChord: Math.max(one.minValuableChord ?? 3, two.minValuableChord ?? 3),
	cut: Math.min(one.cut ?? 13, two.cut ?? 13)
}) as AChord

export const sortInterval = (intervals: intervalNote[]) => intervals.sort((a, b) => a.noteIndex + (a.change ?? 0) - b.noteIndex - (b.change ?? 0))

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
