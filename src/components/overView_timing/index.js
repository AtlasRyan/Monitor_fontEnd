import {
	Button,
	Card,
	Col,
	Row,
	Statistic,
	Segmented,
	Divider,
	Rate,
} from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { overview_timing } from "../../servers/overview_timing";
import { useEffect, useState } from "react";

// let res = overview_timing("localhost", "week").then((result) => {
// 	let a = result;
// 	console.log(a.data);
// });

const OverView_timing = (props) => {
	const [res, setRes] = useState({});
	const [time, setTime] = useState("Daily");
	useEffect(() => {
		getRes();
	}, [time]);
	const urlPram = props.url;
	const getRes = async () => {
		const timeParm = time === "Daily" ? "day" : "week";
		const { data } = await overview_timing(urlPram, timeParm);
		const list = [...data];
		const list1 = list.map((item, index) =>
			Object.assign(item, { key: `${index + 1}` })
		);
		const list2 = list1.filter((item) => item.count >= 1);
		const item = list2[list2.length - 1];
		setRes(item);
	};
	return (
		<Card title='性能数据' bordered={false}>
			<Row gutter={16}>
				<Col span={4}>
					<Statistic title='dns' value={res.dns} suffix='ms' />
				</Col>
				<Col span={4}>
					<Statistic title='fP' value={res.first_paint} suffix='ms' />
				</Col>
				<Col span={4}>
					<Statistic title='fcp' value={res.first_content_paint} suffix='ms' />
				</Col>
				<Col span={4}>
					<Statistic
						title='lcp'
						value={res.largest_contentful_paint}
						suffix='ms'
					/>
				</Col>
				<Col span={4}>
					<Statistic title='domReady' value={res.dom_ready} suffix='ms' />
				</Col>
				<Col span={4}>
					<Statistic title='load' value={res.load} suffix='ms' />
				</Col>
			</Row>
			<Divider plain>切换</Divider>
			<Segmented
				options={["Daily", "Weekly"]}
				value={time}
				onChange={setTime}
			/>
		</Card>
	);
};
export { OverView_timing };
