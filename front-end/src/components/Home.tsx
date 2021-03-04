import React from 'react';
import '../css/Home.css';
import 'fontsource-roboto';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface Myprops { }
interface Mystate
{
	list: string[];
	card: string[];
}

class Home extends React.Component<Myprops, Mystate>
{
	constructor(props: Myprops)
	{
		super(props);
		this.state = {
			list: ["list1", "list2", "list3"],
			card: ["card1", "card2", "card3"],
		};
	}

	componentDidMount()
	{

	}

	render()
	{
		const { list, card } = this.state;
		return (
			<div>
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
				<div className="listBox">
					<Typography variant="subtitle1" gutterBottom>
						{list[0]}
      				</Typography>					
					<input></input>
					<div className="cardBox">
						{card[0]}
					</div>
					<Button variant="contained" color="primary">
						add new card
					</Button>
					<Button variant="contained" color="primary">
						delete card
					</Button>
				</div>

				<div className="listBox">
					{list[1]}
					<input></input>
					<div className="cardBox">
						{card[0]}
					</div>
					<button type="button">
						add new card
					</button>
					<button type="button">
						delete card
					</button>
				</div>
			</div>
			
		)
	}
}
export default Home;
// ========================================
