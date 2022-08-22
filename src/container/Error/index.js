import { Table } from "antd";
import { Card, Col, Row } from "antd";
import { ErrorList_jsError } from "../../components/errorList_jsError";
import { ErrorList_PromiseError } from "../../components/errorList_PromiseError";
import { ErrorList_resourceError } from "../../components/errorList_resourceError";
import { ErrorList_whiteScreenError } from "../../components/errorList_whiteScreenError";

const Error = () => {
	let url = window.sessionStorage.getItem("url");
	return (
		<div className='site-card-wrapper'>
			<ErrorList_jsError url={url} />
			<br></br>
			<br></br>
			<ErrorList_PromiseError url={url} />
			<br></br>
			<br></br>
			<ErrorList_resourceError url={url} />
			<br></br>
			<br></br>
			<ErrorList_whiteScreenError url={url} />
		</div>
	);
};

export default Error;
