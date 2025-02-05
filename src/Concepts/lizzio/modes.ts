import { notes } from "@/Concepts/ScaleConstruction";

export const scales: {} = {
	Major: [1, 1, 0.5, 1, 1, 1, 0.5],
	HarmonicMinor: [1, 0.5, 1, 1, 0.5, 1.5, 0.5],
	my: [0.5, 1, 0.5, 1.5, 0.5, 1, 1]
}

export const Modes = {
	Major: [
		'Ionian (major)',
		'Dorian',
		'Phrygian',
		'Lydian',
		'Mixolydian',
		'Aolian (minor)',
		'Locrian',
	],
	HarmonicMinor: [
		'Aeolian ♯7',
		'Locrian ♯6',
		'Ionian ♯5 (augmented major)',
		'Dorian ♯4',
		'Phrygian Dominant',
		'Lydian ♯2',
		'Super Locrian ♭♭7',
	]
}

export const Mode = (scale, mode = 1) => {
	let modeScale = [...scale]
	for (let index = mode - 1; index; --index) {
		modeScale.push(modeScale[0])
		modeScale.shift()
	}
	return modeScale
}

export const ModeBack = (scale, mode = 1) => {
	let modeScale = [...scale]
	for (let index = mode - 1; index; --index) {
		modeScale.push(modeScale[0])
		modeScale.shift()
	}
	return modeScale
}

export const modeScale = (scale, root, mode = 1) => {
	const scaleNotes = [root]
	let currentNoteIndex = notes.findIndex((note) => note === root)

	const modeScale = Mode(scale, mode)

	modeScale.forEach((step) => {
		scaleNotes.push(notes[(currentNoteIndex + step * 2) % 12]);
		currentNoteIndex = (currentNoteIndex + step * 2) % 12;
	})

	scaleNotes.pop()
	return scaleNotes;
};

export const distanceFitsMode = (distances: number[], scale: number[]) => {
	const fits = []
	for (let j = 1; j <= 7; j++) {
		const mode = Mode(scale, j)
		const the = []
		mode.forEach((step, index) => the.push(
			(index > 0 ? the[index - 1] : 0) +
			step
		))

		let ok = true
		distances.forEach((step) => {
			if (!the.includes(step)) {
				ok = false
			}
		})

		if (ok)
			fits.push(j)
	}
	return fits
}

export const makeScale = () => {

}