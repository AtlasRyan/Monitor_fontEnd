import { OverView_error } from "../overView_error";

const OverView_whiteScreenError = (props) => {
	return (
		<OverView_error
			url={props.url}
			dataType='whiteScreenError'
			title='whiteScreen异常'
		/>
	);
};
export { OverView_whiteScreenError };
