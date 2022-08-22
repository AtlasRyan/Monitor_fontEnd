import * as echarts from "echarts";
import { Card, Divider, Segmented, Col } from "antd";
import { useEffect, useState } from "react";
import { overview_timing } from "../../servers/overview_timing";

const PieGraph = (props) => {
	const [time, setTime] = useState("Daily");
	useEffect(() => {
		getRes();
	}, [time]);
	const getRes = async () => {
		const urlPram = props.url;
		const timeParm = time === "Daily" ? "day" : "week";
		const { data } = await overview_timing(urlPram, timeParm);
		const list = [...data];
		const list1 = list.map((item, index) =>
			Object.assign(item, { key: `${index + 1}` })
		);
		const list2 = list1.filter((item) => item.count >= 1);
		const item = list2[list2.length - 1];

		const source = Math.round(item.load / 10); //评分算法偷个懒，去load时间与满分的差值

		setChart(source);
	};
	const setChart = (source) => {
		if (window.echarts) {
			// 初始化饼图，返回实例。
			let myChart = echarts.init(document.getElementById("graphtiming"));
			let option = {
				title: {
					text: `${100 - source}` + "分",
					left: "center",
					top: "center",
				},
				series: [
					{
						label: {
							show: false,
						},
						type: "pie",
						data: [
							{
								value: 100 - source,
							},
							{
								value: source,
							},
						],
						radius: ["40%", "70%"],
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
		<Card title={"得分概览"} bordered={false}>
			<Col span={8}>
				<div
					id={"graphtiming"}
					style={{
						height: "200px",
					}}
				></div>
			</Col>
			<Col span={8}></Col>
			<Divider plain>切换</Divider>
			<Segmented
				options={["Daily", "Weekly"]}
				value={time}
				onChange={setTime}
			/>
		</Card>
	);
};

export { PieGraph };
