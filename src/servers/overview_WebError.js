export function overview_webError(url, timeType, dataType) {
	return fetch(
		"http://106.55.171.246/overview/webError?url=" +
			`${url}` +
			"&timeType=" +
			`${timeType}` +
			"&dataType=" +
			`${dataType}`,
		{ method: "get" }
	).then((res) => res.json());
}
