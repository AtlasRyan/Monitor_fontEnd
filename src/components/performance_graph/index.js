import * as echarts from "echarts";
import { Card, Divider, Segmented } from "antd";
import { useEffect, useState } from "react";
import { overview_timing } from "../../servers/overview_timing";

const PeformanceGraph = (props) => {
	const [time, setTime] = useState("Daily");
	useEffect(() => {
		getRes();
	}, [time]);
	const getRes = async () => {
		const urlPram = props.url;
		const timeParm = time === "Daily" ? "day" : "week";
		const { data } = await overview_timing(urlPram, timeParm);
		const list = [...data];

		const axis = [...list].map((item) => ({
			xAxis: item.time,
			yAxis1: item.dns,
			yAxis2: item.dom_ready,
			yAxis3: item.load,
			yAxis4: item.first_paint,
			yAxis5: item.first_content_paint,
			yAxis6: item.largest_contentful_paint,
		}));
		const axisArray = [[], [], [], [], [], [], [], []];
		axis.forEach((item) => {
			axisArray[0].push(item.xAxis);
			axisArray[1].push(item.yAxi1);
			axisArray[2].push(item.yAxis2);
			axisArray[3].push(item.yAxis3);
			axisArray[4].push(item.yAxis4);
			axisArray[5].push(item.yAxis5);
			axisArray[6].push(item.yAxis6);
		});
		console.log(axisArray);
		setChart(axisArray);
	};
	const dataType = props.dataType;
	const setChart = (data) => {
		if (window.echarts) {
			// 初始化饼图，返回实例。
			let myChart = echarts.init(
				document.getElementById("graph" + `${dataType}`)
			);
			let option = {
				title: { text: "趋势统计" },
				tooltip: {},
				legend: {
					data: [
						"dns",
						"dom_ready",
						"load",
						"first_paint",
						"first_content_paint",
						"largest_contentful_paint",
					],
				},
				xAxis: {
					data: data[0],
				},
				yAxis: {
					name: "反应时间/ms",
				},
				series: [
					{
						name: "dns",
						type: "line",
						data: data[1],
					},
					{
						name: "dom_ready",
						type: "line",
						data: data[2],
					},
					{
						name: "load",
						type: "line",
						data: data[3],
					},
					{
						name: "first_paint",
						type: "bar",
						data: data[4],
					},
					{
						name: "first_content_paint",
						type: "bar",
						data: data[5],
					},
					{
						name: "largest_contentful_paint",
						type: "bar",
						data: data[6],
					},
				],
			};
			myChart.setOption(option);
			window.onresize = function () {
				myChart.resize();
			};
		}
	};
	return (
		<Card title={"部分" + `${dataType}` + "指标统计图"} bordered={false}>
			<div
				id={"graph" + `${dataType}`}
				style={{
					height: "350px",
				}}
			></div>
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

export { PeformanceGraph };
