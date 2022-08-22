import About from "../container/About";
import Error from "../container/Error";
import Http from "../container/Http";
import Performance from "../container/Performance";
import ProductList from "../container/ProjectsManage";
import UserBehavior from "../container/UserBehavior";

const routes = [
	{
		path: "/error",
		component: Error,
	},
	{
		path: "/http",
		component: Http,
	},
	{
		path: "/performance",
		component: Performance,
	},
	{
		path: "/projectsmanage",
		component: ProductList,
	},
	{
		path: "/userbehavior",
		component: UserBehavior,
	},
	{
		path: "/about",
		component: About,
	},
];

export default routes;
