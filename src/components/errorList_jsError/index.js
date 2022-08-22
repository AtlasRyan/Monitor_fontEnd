import { useEffect, useState } from "react";
import { Table, Col, Row, Card } from "antd";
import { errorList } from "../../servers/errorList";
import { getLocalTime } from "../../utils/timeStamp_to_localtime";
import { Graph } from "../errorList_graph";
// let res = errorList("localhost", "jsError").then((result) => {
// 	let a = result;
// 	console.log(a.data);
// });

const ErrorList_jsError = (props) => {
	const columns = [
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
		},
		{
			title: "URL",
			dataIndex: "url",
			key: "url",
		},
		{
			title: "Message",
			dataIndex: "message",
			key: "message",
		},
		{
			title: "Position",
			dataIndex: "position",
			key: "position",
		},
		{
			title: "Stack",
			dataIndex: "stack",
			key: "stack",
		},
		{
			title: "Selector",
			dataIndex: "selector",
			key: "selector",
		},
	];
	const [res, setRes] = useState([]);
	useEffect(() => {
		getRes();
	}, []);
	const urlPram = props.url;
	const getRes = async () => {
		const { data } = await errorList(urlPram, "jsError");
		const list = [...data.data];
		const list1 = list.map((item, index) =>
			Object.assign(item, {
				key: `${index + 1}`,
				time: getLocalTime(item.timestamp),
			})
		);
		setRes(list1);
	};

	return (
		<Row gutter={[16, 16]}>
			<Col span={24}>
				<Graph url='localhost' dataType='jsError' />
			</Col>
			<Col span={24}>
				<Card title='JS错误数目统计列表' bordered={false}>
					<Table dataSource={res} columns={columns} />
				</Card>
			</Col>
		</Row>
	);
};

export { ErrorList_jsError };