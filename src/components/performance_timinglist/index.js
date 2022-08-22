import { Table, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { performance_timingList } from "../../servers/performance_timingList";
import { getLocalTime } from "../../utils/timeStamp_to_localtime";

const Performance_timingList = (props) => {
	const [res, setRes] = useState([]);
	useEffect(() => {
		getRes();
	}, []);
	const urlPram = props.url;
	const getRes = async () => {
		const { data } = await performance_timingList(urlPram);
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
				<Card title='统计列表' bordered={false}>
					<Table dataSource={res} columns={props.columns} />
				</Card>
			</Col>
		</Row>
	);
};

export { Performance_timingList };
