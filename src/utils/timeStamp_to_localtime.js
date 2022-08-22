export function getLocalTime(nS) {
	return new Date(parseInt(nS))
		.toLocaleString()
		.replace(/年|月/g, "-")
		.replace(/日/g, " ");
}
