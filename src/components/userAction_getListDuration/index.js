import { Table } from "antd";
import { useEffect, useState } from "react";
import { queryUserAction } from "../../servers/userAction_getList";
import { getLocalTime } from "../../utils/timeStamp_to_localtime";

const Duration = (props) => {
	const columns = [
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
		},
		{
			title: "Duration",
			dataIndex: "duration",
			key: "duration",
		},
		{
			title: "URL",
			dataIndex: "page_url",
			key: "page_url",
		},
		{
			title: "IP",
			dataIndex: "ip",
			key: "ip",
		},
	];
	const [res, setRes] = useState([]);
	useEffect(() => {
		getRes();
	}, []);
	const urlPram = props.url;
	const getRes = async () => {
		const { data } = await queryUserAction(urlPram, "duration");
		const list = [...data.data];
		const list1 = list.map((item, index) =>
			Object.assign(item, {
				key: `${index + 1}`,
				time: getLocalTime(item.start_time),
			})
		);
		setRes(list1);
	};

	return <Table dataSource={res} columns={columns} />;
};

export { Duration };
