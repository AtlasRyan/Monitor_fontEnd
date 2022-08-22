import { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
import { queryWebList } from "../../servers/product";

const { Column } = Table;

const ProjectsMange = (props) => {
	const [res, setRes] = useState([]);
	useEffect(() => {
		getRes();
	}, [res.length]);
	const getRes = async () => {
		const { data } = await queryWebList();

		const list = [...data];
		const list1 = list.map((item, index) =>
			Object.assign(item, { key: `${index + 1}` })
		);
		setRes(list1);
	};
	return (
		<Table dataSource={res}>
			<Column title='Name' dataIndex='name' key='name' />
			<Column title='URL' dataIndex='url' key='url' />
			<Column
				title='Tags'
				dataIndex='tags'
				key='tags'
				render={(tags) => (
					<>
						{[].concat(tags).map((tag) => (
							<Tag color='blue' key={tag}>
								{tag}
							</Tag>
						))}
					</>
				)}
			/>
			<Column
				title='Action'
				key='action'
				render={(item, record, index) => {
					return (
						<Space size='middle'>
							<Button
								id={item.url}
								type='link'
								onClick={() => props.getUrl(item.url)}
							>
								Link
							</Button>
							<Button danger>Delete</Button>
						</Space>
					);
				}}
			/>
		</Table>
	);
};

export default ProjectsMange;
