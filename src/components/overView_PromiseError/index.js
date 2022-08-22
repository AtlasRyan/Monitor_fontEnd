import { OverView_error } from "../overView_error";

const OverView_PromiseError = (props) => {
	return (
		<OverView_error
			url={props.url}
			dataType='PromiseError'
			title='Promise异常'
		/>
	);
};
export { OverView_PromiseError };
