import { Col, Row } from "antd";
import { OverView_jsError } from "../../components/overView_jsError";
import { OverView_PromiseError } from "../../components/overView_PromiseError";
import { OverView_resourceError } from "../../components/overView_resourceError";
import { OverView_whiteScreenError } from "../../components/overView_whiteScreenError";
import { OverView_timing } from "../../components/overView_timing";
import { OverView_userBehavior } from "../../components/overView_userBehavior";
import { OverView_HttpRequest } from "../../components/overView_httpRequest";
import { PieGraph } from "../../components/pieGraph";

const About = (props) => {
	const url = window.sessionStorage.getItem("url");
	return (
		<div className='site-card-wrapper'>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<PieGraph url={url} />
				</Col>
				<Col span={6}>
					<OverView_jsError url={url} />
				</Col>
				<Col span={6}>
					<OverView_PromiseError url={url} />
				</Col>
				<Col span={6}>
					<OverView_resourceError url={url} />
				</Col>
				<Col span={6}>
					<OverView_whiteScreenError url={url} />
				</Col>
				<Col span={24}>
					<OverView_userBehavior url={url} />
				</Col>
				<Col span={24}>
					<OverView_HttpRequest url={url} />
				</Col>
				<Col span={24}>
					<OverView_timing url={url} />
				</Col>
			</Row>
		</div>
	);
};

export default About;
