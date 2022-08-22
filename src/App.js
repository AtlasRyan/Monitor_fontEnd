import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
	BugOutlined,
	DesktopOutlined,
	MailOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import routes from "./router";

const { Header, Content, Sider } = Layout;

const itemstop = ["前端监控系统"].map((key) => ({
	key,
	label: `${key}`,
}));

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const itemsside = [
	getItem("项目管理", "/projectsmanage", <NotificationOutlined />),
	getItem("总览", "/about", <DesktopOutlined />),
	getItem("异常监控", "/error", <BugOutlined />),
	getItem("HTTP请求", "/http", <MailOutlined />),
	getItem("用户行为", "/userbehavior", <UserOutlined />),
	getItem("性能数据", "/performance", <LaptopOutlined />),
];

const App = () => {
	const to = useNavigate();
	useEffect(() => {
		to("/projectsmanage");
	}, []);
	const handleClick = (e) => {
		console.log("click ", e);
		to(e.key);
	};
	let url = "";
	const getUrl = (e) => {
		to("/about");
		url = e;
		console.log(e);
		window.sessionStorage.setItem("url", url);
	};
	return (
		<Layout>
			<Header
				className='header'
				style={{
					position: "fixed",
					zIndex: 2,
					width: "100%",
				}}
			>
				<div className='logo'> </div>
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={["前端监控系统"]}
					items={itemstop}
				/>
			</Header>
			<Layout style={{ minHeight: "95vh" }}>
				<Sider width={250} className='site-layout-background'>
					<Menu
						mode='inline'
						defaultSelectedKeys={["1"]}
						defaultOpenKeys={["sub1"]}
						style={{
							height: "100%",
							borderRight: 0,
							marginTop: 64,
						}}
						items={itemsside}
						onClick={handleClick}
					/>
				</Sider>
				<Layout
					style={{
						padding: "0 24px 24px",
						marginTop: 64,
					}}
				>
					<Content
						className='site-layout-background'
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						<>
							<Routes>
								{routes.map((route) => (
									<Route
										exact
										key={route.path}
										path={route.path}
										element={<route.component getUrl={getUrl} />}
									></Route>
								))}
							</Routes>
						</>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default App;
