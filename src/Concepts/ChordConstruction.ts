import { createScale, intervalNote, MajorScale, note, notes } from "./ScaleConstruction";
import AllChords, { all } from "./AllChords";

export type humanReadableChord = {chordName: string; notes: note[]; root: note;}

export const createChord = (scale: note[], chordNotes: intervalNote[]) => {
	const ChordNotes: note[] = [];

	chordNotes.forEach((chordNote) => {
		let note = scale[(chordNote.noteIndex - 1) % 7];
		// console.log(chordNote, scale);
		if (chordNote?.change) {
			const chordNoteIndex = notes.findIndex((pitch) => note === pitch);
			note = notes[(chordNoteIndex + chordNote.change * 2 + 12) % 12];
		}
		ChordNotes.push(note);
	});
	return ChordNotes;
};

// export createChordBasedOnMajor = (chordNotes: intervalNote[]) => createChord(createScale(MajorScale, ), chordNotes);

export const createTriadChordFromRoot = (note: note, rootScale: note[]) => {
	const root = rootScale[0];
	const noteToRootInterval = (notes.findIndex((pitch) => pitch === note) - notes.findIndex((pitch) => pitch === root) + 12) % 12;
	const noteScale = rootScale.map((rootScaleNote) => notes[(notes.findIndex((pitch) => pitch === rootScaleNote) + noteToRootInterval) % 12]);

	const scaleTriad = [noteScale[0], noteScale[2], noteScale[4]];

	/* check up to 2 half steps, there might not be two 3 half steps sequential in a scale */
	const intervalsToCheck = [-0.5, 0.5, -1, 1];
	const scaleTriadCompatibleWithRoot: note[] = [];

	scaleTriad.forEach((triadNote) => {
		if (!rootScale.includes(triadNote)) {
			const triadNoteIndex = notes.findIndex((pitch) => pitch === triadNote);

			intervalsToCheck.find((interval) => {
					const newNote = notes[(triadNoteIndex + interval * 2 + 12) % 12];
					return rootScale.includes(newNote) && scaleTriadCompatibleWithRoot.push(newNote);
				}
			);
		} else {
			scaleTriadCompatibleWithRoot.push(triadNote);
		}
	});

	return scaleTriadCompatibleWithRoot;
};

export const createAllPossibleChordsInRootScale = (note: note, rootScale: note[]) => {
	// const root = rootScale[0];
	// const noteToRootInterval = (notes.findIndex((pitch) => pitch === note) - notes.findIndex((pitch) => pitch === root) + 12) % 12;
	// const noteScale = rootScale.map((rootScaleNote) => notes[(notes.findIndex((pitch) => pitch === rootScaleNote) + noteToRootInterval) % 12]);

	const possibleChords: Omit<humanReadableChord, 'root'>[] = [];
	const noteMajorScale = createScale(MajorScale, note);

	Object.keys(AllChords).forEach((chord: all) => {
		let allNotesAreInScale = true;
		const thisChord: note[] = createChord(noteMajorScale, AllChords[chord].intervals);
		// console.log(thisChord);
		thisChord.forEach((pitch) => {
			allNotesAreInScale = allNotesAreInScale && rootScale.includes(pitch);
		});
		if (allNotesAreInScale) {
			possibleChords.push({ chordName: AllChords[chord].symbol, notes: thisChord });
		}
	});

	return possibleChords;
};

export const findChord = (chord: note[], scale) => {
	const allPossible: humanReadableChord[] = [];
	const soClose: humanReadableChord[] = [];

	for (const note of chord) {
		const all = createAllPossibleChordsInRootScale(note, scale);
		for (const possible of all) {
			let allIn = 0;
			chord.forEach((chordNote) => {
				if (!possible.notes.includes(chordNote)) {
					allIn = allIn - 1
				}
			})
			if (allIn === 0) allPossible.push({ root: note, ...possible });
			if (allIn === -1) soClose.push({ root: note, ...possible });
		}
	}

	return allPossible.length === 0 ? soClose : allPossible;
}
