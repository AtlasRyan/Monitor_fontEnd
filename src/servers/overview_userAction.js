export function overview_userAction(url, timeType, dataType) {
	return fetch(
		"http://106.55.171.246/overview/userAction?url=" +
			`${url}` +
			"&timeType=" +
			`${timeType}` +
			"&dataType=" +
			`${dataType}`,
		{ method: "get" }
	).then((res) => res.json());
}
