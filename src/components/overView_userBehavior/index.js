import { Card, Col, Row, Statistic, Segmented, Divider } from "antd";
import { useEffect, useState } from "react";
import { overview_userAction } from "../../servers/overview_userAction";
import * as echarts from "echarts";

let myCharChart = null; // 用于存放 echart 初始化返回的实例

const OverView_userBehavior = (props) => {
	const [res, setRes] = useState([]);
	const [time, setTime] = useState("Daily");
	useEffect(() => {
		getRes();
	}, [time]);
	const urlPram = props.url;
	const getRes = async () => {
		const timeParm = time === "Daily" ? "day" : "week";
		const { data } = await overview_userAction(urlPram, timeParm, "userAction");
		const list = [...data];
		const list1 = list.map((item, index) =>
			Object.assign(item, { key: `${index + 1}` })
		);

		const axis = [...list].map((item, index) => ({
			xAxis: item.time,
			yAxis1: item.pvCount,
			yAxis2: item.uvCount,
		}));
		const axisArray = [[], [], []];
		axis.forEach((item) => {
			axisArray[0].push(item.xAxis);
			axisArray[1].push(item.yAxis1);
			axisArray[2].push(item.yAxis2);
		});
		setChart(axisArray);

		const pvSum = list1.reduce(
			(previousValue, currentValue, currentIndex) =>
				previousValue + (currentValue.pvCount - 0),
			0
		);
		const uvSum = list1.reduce(
			(previousValue, currentValue, currentIndex) =>
				previousValue + (currentValue.uvCount - 0),
			0
		);
		const ipSum = list1.reduce(
			(previousValue, currentValue, currentIndex) =>
				previousValue + (currentValue.ipCount - 0),
			0
		);
		const countList = [pvSum, uvSum, ipSum];
		setRes(countList);
	};

	const setChart = (data) => {
		if (window.echarts) {
			// 初始化饼图，返回实例。
			let myChart = echarts.init(document.getElementById("graph1"));
			let option = {
				title: { text: "PV/UV趋势统计" },
				tooltip: {},
				legend: {
					data: ["PV", "UV"],
				},
				xAxis: {
					data: data[0],
				},
				yAxis: {},
				series: [
					{
						name: "PV",
						type: "bar",
						data: data[1],
					},
					{
						name: "UV",
						type: "line",
						data: data[2],
					},
				],
			};
			myChart.setOption(option);
		}
	};

	return (
		<Card title='用户行为' bordered={false}>
			<Row gutter={16}>
				<Col span={8}>
					<Statistic title='PV' value={res[0]} precision={0} />
				</Col>
				<Col span={8}>
					<Statistic title='UV' value={res[1]} precision={0} />
				</Col>
				<Col span={8}>
					<Statistic title='用户数' value={res[2]} precision={0} />
				</Col>
				<Divider plain></Divider>
				<Col span={24}>
					<div
						id='graph1'
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

export { OverView_userBehavior };
