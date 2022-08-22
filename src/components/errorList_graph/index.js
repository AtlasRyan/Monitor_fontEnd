import * as echarts from "echarts";
import { Card, Divider, Segmented } from "antd";
import { useEffect, useState } from "react";
import { overview_webError } from "../../servers/overview_WebError";

const Graph = (props) => {
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

		const axis = [...list].map((item) => ({
			xAxis: item.time,
			yAxis: item.count,
		}));
		const axisArray = [[], []];
		axis.forEach((item) => {
			axisArray[0].push(item.xAxis);
			axisArray[1].push(item.yAxis);
		});
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
					data: ["数目"],
				},
				xAxis: {
					data: data[0],
				},
				yAxis: {},
				series: [
					{
						name: "数目",
						type: "bar",
						data: data[1],
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
		<Card title={`${dataType}` + "错误趋势统计图"} bordered={false}>
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

export { Graph };
