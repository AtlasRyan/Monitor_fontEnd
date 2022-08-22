export function queryUserAction(url, dataType) {
	return fetch(
		"http://106.55.171.246/userAction/getList?url=" +
			`${url}` +
			"&dataType=" +
			`${dataType}`,
		{
			method: "get",
		}
	).then((res) => res.json());
}
