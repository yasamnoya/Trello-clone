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

		const newList = <List></List>

		list.push(newList);

		this.setState({ list: list });

		// list[listID] =
		// 	<div key="" className="listBox">
		// 		<Input placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} />

		// 		<div className="cardBox">
		// 			{card}
		// 		</div>

		// 		<Button variant="contained" color="primary" onClick={this.addNewCard.bind(this)} id={listID.toString()}>
		// 			add new card
		// 		</Button>
		// 	</div>
		// listID++;

		// this.setState({
		// 	list: list,
		// 	listID: listID,
		// })
	}

	addNewCard(e: any)
	{
		// const test = document.getElementById("0");
		// console.log(test);
		// console.log("add card");
		// console.log(e.target.id);
		// let { card, cardID } = this.state;
		// const listID = e.target.id;
		// console.log(listID);
		// card[listID][cardID[listID]] = (
		// 	<div>
		// 		<Input id={cardID[listID].toString()} placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} onChange={this.cardNameChange.bind(this)} />
		// 	</div>
		// )
		// cardID[listID]++;

		// this.setState({
		// 	card: card,
		// 	cardID: cardID,
		// });
	}

	clickCard(e: any)
	{
		// console.log("card click");
		// const toRenameCard = document.getElementById('save' + e.target.id.toString());
		// console.log(toRenameCard)
		// const { card } = this.state;


		// this.setState({
		// 	card: card
		// })
	}

	cardNameChange(e: any)
	{
		// console.log("card name change");
		// console.log(e.target.id);

		// let { cardID } = this.state;

		// const toRenameCard = document.getElementById('save' + e.target.id.toString());

		// console.log(toRenameCard)
		// if (toRenameCard)
		// 	toRenameCard.removeAttribute("disabled");

		// this.setState({
		// 	cardID: cardID,
		// })
	}

	cardRename(e: any)
	{
		// console.log("save click");
		// console.log(e.target.id);

		// const { card } = this.state;

		// const toRenameCard = document.getElementById('save' + e.target.id.toString());
		// if (toRenameCard)
		// 	toRenameCard.setAttribute("disabled", "true");

		// card[Number(e.target.id)] = (
		// 	<div>
		// 		<Input id={e.target.id.toString()} placeholder="Placeholder" inputProps={{ 'aria-label': 'description' }} onClick={this.clickCard.bind(this)} onChange={this.cardNameChange.bind(this)} />
		// 		<Button id={'save' + e.target.id.toString()} variant="contained" color="primary" onClick={this.cardRename.bind(this)} disabled>
		// 			save
		// 		</Button>
		// 	</div>
		// )

		// this.setState({
		// 	card: card
		// })
	}


	render()
	{
		const { list } = this.state;

		return (
			<div>
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
