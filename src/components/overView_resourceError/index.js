import { OverView_error } from "../overView_error";

const OverView_resourceError = (props) => {
	return (
		<OverView_error
			url={props.url}
			dataType='resourceError'
			title='resource异常'
		/>
	);
};
export { OverView_resourceError };
