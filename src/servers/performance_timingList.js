export function performance_timingList(url) {
	return fetch("http://106.55.171.246/performance/timingList?url=" + `${url}`, {
		method: "get",
	}).then((res) => res.json());
}
