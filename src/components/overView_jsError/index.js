import { OverView_error } from "../overView_error";

const OverView_jsError = (props) => {
	return <OverView_error url={props.url} dataType='jsError' title='JS异常' />;
};
export { OverView_jsError };
