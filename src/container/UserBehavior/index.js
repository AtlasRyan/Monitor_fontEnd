import { Card, Col, Row } from "antd";
import { Duration } from "../../components/userAction_getListDuration";
import { Pv } from "../../components/userAction_getListPv";
import { Uv } from "../../components/userAction_getListUv";

const UserBehavior = ({ onDelete, products }) => {
	let url = window.sessionStorage.getItem("url");
	return (
		<div className='site-card-wrapper'>
			<Row gutter={[16, 16]}>
				<Col span={24}>
					<Card title='Duration' bordered={false}>
						<Duration url={url} />
					</Card>
				</Col>
				<Col span={24}>
					<Card title='PV' bordered={false}>
						<Pv url={url} />
					</Card>
				</Col>
				<Col span={24}>
					<Card title='UV' bordered={false}>
						<Uv url={url} />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default UserBehavior;
