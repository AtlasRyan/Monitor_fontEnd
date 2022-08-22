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
import { useEffect, useState } from "react";
import { overview_userAction } from "../../servers/overview_userAction";
import * as echarts from "echarts";
// let res = overview_userAction("localhost", "week", "HTTPdata").then(
// 	(result) => {
// 		let a = result;
// 		console.log(a.data);
// 	}
// );

const OverView_HttpRequest = (props) => {
	const [res, setRes] = useState([]);
	const [time, setTime] = useState("Daily");
	useEffect(() => {
		getRes();
	}, [time]);
	const urlPram = props.url;
	const getRes = async () => {
		const timeParm = time === "Daily" ? "day" : "week";
		const { data } = await overview_userAction(urlPram, timeParm, "HTTPdata");
		const list = [...data];
		const list1 = list.map((item, index) =>
			Object.assign(item, { key: `${index + 1}` })
		);

		const axis = [...list].map((item, index) => ({
			xAxis: item.time,
			yAxis1: item.HTTPCount,
			yAxis2: item.HTTPFail,
		}));
		const axisArray = [[], [], []];
		axis.forEach((item) => {
			axisArray[0].push(item.xAxis);
			axisArray[1].push(item.yAxis1);
			axisArray[2].push(item.yAxis2);
		});
		setChart(axisArray);

		const HTTPSum = list1.reduce(
			(previousValue, currentValue, currentIndex) =>
				previousValue + (currentValue.HTTPCount - 0),
			0
		);
		const HTTPFailSum = list1.reduce(
			(previousValue, currentValue, currentIndex) =>
				previousValue + (currentValue.HTTPFail - 0),
			0
		);
		const countList = [HTTPSum, HTTPFailSum];
		setRes(countList);
	};

	const setChart = (data) => {
		if (window.echarts) {
			// 初始化饼图，返回实例。
			let myChart = echarts.init(document.getElementById("graph2"));
			let option = {
				title: { text: "HTTP请求趋势统计" },
				tooltip: {},
				legend: {
					data: ["总数", "失败数"],
				},
				xAxis: {
					data: data[0],
				},
				yAxis: {},
				series: [
					{
						name: "总数",
						type: "bar",
						data: data[1],
					},
					{
						name: "失败数",
						type: "line",
						data: data[2],
					},
				],
			};
			myChart.setOption(option);
		}
	};

	return (
		<Card title='HTTP请求' bordered={false}>
			<Row gutter={16}>
				<Col span={8}>
					<Statistic title='请求总数' value={res[0]} precision={0} />
				</Col>
				<Col span={8}>
					<Statistic title='失败数' value={res[1]} precision={0} />
				</Col>
				<Divider plain></Divider>
				<Col span={24}>
					<div
						id='graph2'
						style={{
							height: "400px",
						}}
					></div>
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
export { OverView_HttpRequest };
