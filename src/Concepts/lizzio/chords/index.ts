import { intervalNote } from "@/Concepts/ScaleConstruction";
import { noteIndexes } from "@/Concepts/lizzio/chords/utils";

export type AChord = {
	changes?: intervalNote[],
	add?: intervalNote[],
	no?: noteIndexes[],
	cut?: noteIndexes
}

export const dominant: intervalNote[] = [
	{ noteIndex: 1 },
	{ noteIndex: 3 },
	{ noteIndex: 5 },
	{ noteIndex: 7, change: -0.5 },
	{ noteIndex: 9 },
	{ noteIndex: 11 },
	{ noteIndex: 13 }
]

export const major: AChord = { changes: [{ noteIndex: 7, change: 0.5 }] }
export const minor: AChord = { changes: [{ noteIndex: 3, change: -0.5 }] }
export const diminished: AChord = {
	changes: [
		{ noteIndex: 3, change: -0.5 },
		{ noteIndex: 5, change: -0.5 },
		{ noteIndex: 7, change: -0.5 }
	],
	cut: 11
}

export const augmented:AChord = { changes: [{ noteIndex: 5, change: 0.5 }] }

export const sus2: AChord = {
	cut: 7,
	no: [3],
	add: [{ noteIndex: 9 }]
}

export const sus4: AChord = {
	cut: 7,
	no: [3],
	add: [{ noteIndex: 11 }]
}

export const allChords: {[key: string]: AChord} = {
	'': {},
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
