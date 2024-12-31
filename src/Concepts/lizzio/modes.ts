import { notes } from "@/Concepts/ScaleConstruction";

export const modeScale = (scale, root, mode = 1) => {
	const scaleNotes = [root]
	let currentNoteIndex = notes.findIndex((note) => note === root)

	let modeScale = [...scale]
	for (let index = mode - 1; index; --index) {
		modeScale.push(modeScale[0])
		modeScale.shift()
		console.log(modeScale)
	}

	modeScale.forEach((step) => {
		scaleNotes.push(notes[(currentNoteIndex + step * 2) % 12]);
		currentNoteIndex = (currentNoteIndex + step * 2) % 12;
	})

	scaleNotes.pop()
	return scaleNotes;
};