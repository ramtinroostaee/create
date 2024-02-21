export interface intervalNote {
    noteIndex: number,
    change?: 0.5 | -0.5 | 1 | -1,
}

export type note = "A" | "A#" | "B" | "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#";

export const notes: note[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
export const MajorScale: number[] = [1, 1, 0.5, 1, 1, 1, 0.5];

export const MinorAccidental: intervalNote[] = [
    {noteIndex: 1},
    {noteIndex: 2},
    {noteIndex: 3, change: -0.5},
    {noteIndex: 4},
    {noteIndex: 5},
    {noteIndex: 6, change: -0.5},
    {noteIndex: 7, change: -0.5},
];

export const PhrygianDominantAccidental: intervalNote[] = [
    {noteIndex: 1},
    {noteIndex: 2, change: -0.5},
    {noteIndex: 3},
    {noteIndex: 4},
    {noteIndex: 5},
    {noteIndex: 6, change: -0.5},
    {noteIndex: 7, change: -0.5},
];

export const HarmonicMinorAccidental: intervalNote[] = [
    {noteIndex: 1},
    {noteIndex: 2},
    {noteIndex: 3, change: -0.5},
    {noteIndex: 4},
    {noteIndex: 5},
    {noteIndex: 6, change: -0.5},
    {noteIndex: 7 },
];

export const Liaghat: intervalNote[] = [
    {noteIndex: 1},
    {noteIndex: 2, change: -0.5},
    {noteIndex: 3, change: -0.5},
    {noteIndex: 4},
    {noteIndex: 5, change: -0.5},
    {noteIndex: 6, change: -0.5},
    {noteIndex: 7, change: -0.5 },
]

export const createScale = (scale, root) => {
    const scaleNotes = [root];
    let currentNoteIndex = notes.findIndex((note) => note === root);

    scale.forEach((step) => {
        scaleNotes.push(notes[(currentNoteIndex + step * 2) % 12]);
        currentNoteIndex = (currentNoteIndex + step * 2) % 12;
    });

    scaleNotes.pop();
    return scaleNotes;
};

export const createIntervalsFromMajorScale = (intervalNotes: intervalNote[], root) => {
    const Major = createScale(MajorScale, root);
    const intervalsArray = [];
    let currentIndex = notes.findIndex((note) => note === root);
    intervalNotes.push(intervalNotes[0]);

    for (let i = 1; i <= intervalNotes.length - 1; i++) {
        let newIndex = notes.findIndex((note) => note === Major[intervalNotes[i]?.noteIndex - 1]);
        if (intervalNotes[i]?.change) {
            newIndex = (newIndex + intervalNotes[i].change * 2 + 12) % 12;
        }

        intervalsArray.push(((newIndex - currentIndex + 12) % 12) / 2);
        currentIndex = newIndex;
    }
    intervalNotes.pop();
    return intervalsArray;
};

export const createScaleFromMajor = (intervalNotes: intervalNote[], root) =>
    createScale(createIntervalsFromMajorScale(intervalNotes, root), root);
