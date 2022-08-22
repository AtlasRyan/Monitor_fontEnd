import { Card, Col, Row, Statistic, Segmented, Divider, Rate } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { overview_webError } from "../../servers/overview_WebError";
import { useEffect, useState } from "react";

// let res = overview_webError("localhost", "week", "jsError").then((result) => {
// 	let a = result;
// 	console.log(a.data);
// });

const OverView_error = (props) => {
	const [res, setRes] = useState(0); //总数
	const [roc, setRoc] = useState(0); //变化率
	const [time, setTime] = useState("Daily");
	useEffect(() => {
		getRes();
	}, [time]);
	const getRes = async () => {
		const urlPram = props.url;
		const timeParm = time === "Daily" ? "day" : "week";
		const dataTypePram = props.dataType;
		const { data } = await overview_webError(urlPram, timeParm, dataTypePram);
		const list = [...data];
		const list1 = list.map((item, index) =>
			Object.assign(item, { key: `${index + 1}` })
		);
		// console.log(list1);
		const sum = list1.reduce(
			(previousValue, currentValue, currentIndex) =>
				previousValue + (currentValue.count - 0),
			0
		);
		setRes(sum);
		const list2 = list1.filter((item) => item.count >= 1);
		// console.log(list2);
		const rate =
			list2.length <= 1
				? 0
				: ((list2[list2.length - 1].count - list2[list2.length - 2].count) /
						list2[list2.length - 2].count) *
				  100;
		setRoc(rate);
	};
	const color = roc > 0 ? "#cf1322" : "#3f8600";
	const title = props.title;
	return (
		<Card title={title} bordered={false}>
			<Statistic title='总数' value={res} />
			<Statistic
				title='增长比率'
				value={roc}
				precision={2}
				valueStyle={{
					color: color,
				}}
				prefix={roc > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
				suffix='%'
			/>
			<Divider plain>切换</Divider>
			<Segmented
				block
				options={["Daily", "Weekly"]}
				value={time}
				onChange={setTime}
			/>
		</Card>
	);
};
export { OverView_error };
