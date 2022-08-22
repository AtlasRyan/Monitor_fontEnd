export function queryWebList() {
	return fetch("http://106.55.171.246/manage/getAllWeb").then((res) =>
		res.json()
	);
}
