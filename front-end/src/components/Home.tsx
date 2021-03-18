import React from 'react';
import '../css/Home.css';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import List from './List';
import Card from './Card';

interface Myprops { }
interface Mystate
{
	list: JSX.Element[];
	// card: JSX.Element[][];
	// listID: number;
	// cardID: number[];
	// saveStatus: boolean[][];
}

class Home extends React.Component<Myprops, Mystate>
{
	private timerId: any = 0;

	constructor(props: Myprops)
	{
		super(props);
		this.state = {
			list: [],
		};
	}

	// Set timer 1000ms
	componentDidMount()
	{
		fetch('http://localhost:8000/boards/lists/', {
			method: "GET",
		}).then(res =>
		{
			return res.json();
		}).then(data =>
		{
			data.forEach((item: any) =>
			{
				console.log(item);
				this.initialList(item);
			})

			fetch('http://localhost:8000/boards/cards/', {
				method: "GET",
			}).then(res =>
			{
				return res.json();
			}).then(data =>
			{
				data.forEach((item: any) =>
				{
					console.log(item);
				})
			})
		})
	}

	// Clean timer when component dies
	componentWillUnmount()
	{
		//clearInterval(this.timerId);
	}

	update()
	{

	}

	initialList(item: any)
	{
		let { list } = this.state;

		let id = -1, title = "title", order = -1;
		id = Number(item.id);
		title = item.title.toString();
		console.log(title);
		order = Number(item.order);

		const newList = <List id={id} title={title} order={order} />
		list.push(newList);
		this.setState({ list: list });
	}

	addList(e: any)
	{
		console.log("add list");
		let { list } = this.state;

		const data = { title: "title" };
		let id = -1, title = "title", order = -1;
		fetch('http://localhost:8000/boards/lists/', {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			},
		}).then(res =>
		{
			return res.json();
		}).then(data =>
		{
			console.log(data);
			
			id = Number(data.id);
			order = Number(data.order);
			console.log(id);

			const newList = <List id={id} title={title} order={order} />
			list.push(newList);
			this.setState({ list: list });
		})


	}

	render()
	{
		const { list } = this.state;

		return (
			<div className="lists-canvas">
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

				<div>
					{list}
				</div>

				<Button variant="contained" color="primary" onClick={this.addList.bind(this)}>
					add list
				</Button>
			</div>

		)
	}
}
export default Home;
// ========================================
