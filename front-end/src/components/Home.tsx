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
		//this.timerId = setInterval(this.update.bind(this), 1000);
	}

	// Clean timer when component dies
	componentWillUnmount()
	{
		//clearInterval(this.timerId);
	}

	update()
	{

	}

	addList(e: any)
	{
		console.log("add list");
		let { list } = this.state;

		const newList = <List/>

		list.push(newList);

		this.setState({ list: list });
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
