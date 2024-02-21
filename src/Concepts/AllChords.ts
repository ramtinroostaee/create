import { intervalNote } from "./ScaleConstruction";

export interface chord {
	intervals: intervalNote[],
	symbol: string
}

export const major: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }],
	symbol: ""
};

export const minor: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3, change: -0.5 }, { noteIndex: 5 }],
	symbol: "m"
};

export const powerChord: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 5 }],
	symbol: "5"
};

export const augmented: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5, change: 0.5 }],
	symbol: "5"
};

export const diminished: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3, change: -0.5 }, { noteIndex: 5, change: -0.5 }],
	symbol: "dim"
};

export const suspended4th: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 4 }, { noteIndex: 5 }],
	symbol: "sus4"
};

export const suspended2nd: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 2 }, { noteIndex: 5 }],
	symbol: "sus2"
};

// export const majorWAdded9th: chord = {
// 	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, { noteIndex: 9 }],
// 	symbol: "add9"
// };
//
// export const minorWAdded9th: chord = {
// 	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, { noteIndex: 9 }],
// 	symbol: "m(add9)"
// };

export const majorSeventh: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, { noteIndex: 7 }],
	symbol: "maj7"
};

export const minorSeventh: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3, change: -0.5 }, { noteIndex: 5 }, { noteIndex: 7, change: -0.5 }],
	symbol: "m7"
};

export const dominantSeventh: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, { noteIndex: 7, change: -0.5 }],
	symbol: "7"
};

export const majorNinth: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, { noteIndex: 7 }, { noteIndex: 9 }],
	symbol: "maj9"
};

export const minorNinth: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3, change: -0.5 }, { noteIndex: 5 }, {
		noteIndex: 7,
		change: -0.5
	}, { noteIndex: 9 }],
	symbol: "m9"
};

export const dominantNinth: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, { noteIndex: 7, change: -0.5 }, { noteIndex: 9 }],
	symbol: "9"
};

export const majorEleventh: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, { noteIndex: 7 }, { noteIndex: 9 }, { noteIndex: 11 }],
	symbol: "maj11"
};

export const minorEleventh: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3, change: -0.5 }, { noteIndex: 5 }, {
		noteIndex: 7,
		change: -0.5
	}, { noteIndex: 9 }, { noteIndex: 11 }],
	symbol: "m11"
};

export const dominantEleventh: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, {
		noteIndex: 7,
		change: -0.5
	}, { noteIndex: 9 }, { noteIndex: 11 }],
	symbol: "11"
};

export const majorThirteenth: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, { noteIndex: 7 }, { noteIndex: 9 }, { noteIndex: 13 }],
	symbol: "maj13"
};

export const minorThirteenth: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3, change: -0.5 }, { noteIndex: 5 }, {
		noteIndex: 7,
		change: -0.5
	}, { noteIndex: 9 }, { noteIndex: 11 }, { noteIndex: 13 }],
	symbol: "m13"
};

export const dominantThirteenth: chord = {
	intervals: [{ noteIndex: 1 }, { noteIndex: 3 }, { noteIndex: 5 }, {
		noteIndex: 7,
		change: -0.5
	}, { noteIndex: 9 }, { noteIndex: 13 }],
	symbol: "13"
};
