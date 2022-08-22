import { Table } from "antd";
import { useEffect, useState } from "react";
import { queryHttp } from "../../servers/HTTPErrorList";
import { getLocalTime } from "../../utils/timeStamp_to_localtime";

const Http = ({ onDelete, products }) => {
	let url = window.sessionStorage.getItem("url");
	const columns = [
		{
			title: "请求时间",
			dataIndex: "time",
			key: "time",
		},
		{
			title: "请求类型",
			dataIndex: "method",
			key: "method",
		},
		{
			title: "请求路径",
			dataIndex: "pathname",
			key: "pathname",
		},
		{
			title: "请求状态",
			dataIndex: "status",
			key: "status",
		},
		{
			title: "等待时间",
			dataIndex: "duration",
			key: "duration",
		},
		{
			title: " 是否异步",
			dataIndex: "is_async_string",
			key: "is_async_string",
		},
		{
			title: "请求参数",
			dataIndex: "params",
			key: "params",
		},
		{
			title: "返回值",
			dataIndex: "response",
			key: "response",
		},
	];
	const [res, setRes] = useState([]);
	useEffect(() => {
		getRes();
	}, []);
	const getRes = async () => {
		const { data } = await queryHttp(url);
		const list = [...data.data];
		const list1 = list.map((item, index) =>
			Object.assign(item, {
				key: `${index + 1}`,
				time: getLocalTime(item.create_time),
				is_async_string: item.is_async === true ? "是" : "否",
			})
		);
		setRes(list1);
	};

	return <Table dataSource={res} columns={columns} />;
};

export default Http;
