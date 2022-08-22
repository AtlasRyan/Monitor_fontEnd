export function queryHttp(url) {
	return fetch("http://106.55.171.246/HTTP/errorList?url=" + `${url}`, {
		method: "get",
	}).then((res) => res.json());
}
