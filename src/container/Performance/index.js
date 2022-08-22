import { Table, Popconfirm, Button } from "antd";
import { Card, Col, Row } from "antd";
import { Performance_timingList } from "../../components/performance_timinglist";
import { useState } from "react";
import { PeformanceGraph } from "../../components/performance_graph";

const Performance = () => {
	let url = window.sessionStorage.getItem("url");
	const columns1 = [
		{
			title: "ID",
			dataIndex: "key",
			key: "id",
		},
		{
			title: "Time",
			dataIndex: "time",
			key: "time",
		},
		{
			title: "DNSTime",
			dataIndex: "dns",
			key: "dns",
		},
		{
			title: "ConnectTime",
			dataIndex: "connect",
			key: "connect",
		},
		{
			title: "TtfbTime",
			dataIndex: "ttfb",
			key: "ttfb",
		},
		{
			title: " ResponseTime",
			dataIndex: "response",
			key: "response",
		},
		{
			title: "ParseDomTime",
			dataIndex: "parse_dom",
			key: "parse_dom",
		},
		{
			title: "DomReady",
			dataIndex: "dom_ready",
			key: "dom_ready",
		},
		{
			title: "DomContentLoadedTime",
			dataIndex: "dom_content_loaded",
			key: "dom_content_loaded",
		},
	];
	const columns2 = [
		{
			title: "ID",
			dataIndex: "key",
			key: "id",
		},
		{
			title: "TimeToInteractive",
			dataIndex: "to_interactive",
			key: "to_interactive",
		},
		{
			title: "Load",
			dataIndex: "load",
			key: "load",
		},
		{
			title: "FirstPaint",
			dataIndex: "first_paint",
			key: "first_paint",
		},
		{
			title: "firstContentPaint",
			dataIndex: "first_content_paint",
			key: "first_content_paint",
		},
		{
			title: "FirstMeaningfulPaint",
			dataIndex: "first_meaningful_paint",
			key: "first_meaningful_paint",
		},
		{
			title: "LargestContentfulPaint",
			dataIndex: "largest_contentful_paint",
			key: "largest_contentful_paint",
		},
		{
			title: "BrowserName",
			dataIndex: "browser_name",
			key: "browser_name",
		},
		{
			title: "BrowserVersion",
			dataIndex: "browse_version",
			key: "browse_version",
		},
	];
	//const [page, setPage] = useState(1);同步翻页，目前没实现
	return (
		<div className='site-card-wrapper'>
			<Col span={24}>
				<PeformanceGraph url={url} dataType='performance' />
			</Col>
			<br></br>
			<br></br>
			<Performance_timingList url={url} columns={columns1} />
			<br></br>
			<br></br>
			<Performance_timingList url={url} columns={columns2} />
		</div>
	);
};

export default Performance;
