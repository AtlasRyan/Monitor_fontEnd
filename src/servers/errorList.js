export function errorList(url, dataType) {
	return fetch(
		"http://106.55.171.246/overview/errorList?url=" +
			`${url}` +
			"&dataType=" +
			`${dataType}` +
			"&timeType=day",
		{ method: "get" }
	).then((res) => res.json());
}
