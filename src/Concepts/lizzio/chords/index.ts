import { intervalNote } from "@/Concepts/ScaleConstruction";
import { combineAChords, noteIndexes } from "@/Concepts/lizzio/chords/utils";

export type AChord = {
	changes?: intervalNote[],
	add?: intervalNote[],
	no?: noteIndexes[],
	cut?: noteIndexes
	minValuableChord?: number
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

export const major: AChord = { changes: [{ noteIndex: 7, change: 0.5 }], minValuableChord: 4 }
export const minor: AChord = { changes: [{ noteIndex: 3, change: -0.5 }] }
export const diminished: AChord = {
	changes: [
		{ noteIndex: 3, change: -0.5 },
		{ noteIndex: 5, change: -0.5 },
		{ noteIndex: 7, change: -0.5 }
	],
	cut: 11
}

export const augmented: AChord = { changes: [{ noteIndex: 5, change: 0.5 }] }

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

export const halfDiminished: AChord = {
	changes: [
		{ noteIndex: 3, change: -0.5 },
		{ noteIndex: 5, change: -0.5 },
	],
	cut: 7,
	minValuableChord: 4
}

export const jazzSixthChord: AChord = { add: [{ noteIndex: 13 }], cut: 5 }

// 	'': { minValuableChord: 4, changes: [{ noteIndex: 7, change: 0 }] } as AChord,
export const allChords: {[key: string]: AChord} = {
	'': { minValuableChord: 3 } as AChord,
	maj: major,
	m: minor,
	dim: diminished,
	aug: augmented,
	sus2,
	sus4,
	'ø': halfDiminished,
	mMaj: combineAChords(minor, major),
	augMaj: combineAChords(augmented, major),
	6: jazzSixthChord,
}

export const mapChangeToSymbol = {
	0: '♭♭',
	1: '♭',
	2: '',
	3: '♯',
	4: '♯♯'
}
