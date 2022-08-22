//性能数据总览请求
export function overview_timing(url, timeType) {
	return fetch(
		"http://106.55.171.246/overview/timing?url=" +
			`${url}` +
			"&timeType=" +
			`${timeType}` +
			"&dataType=timing",
		{ method: "get" }
	).then((res) => res.json());
}
