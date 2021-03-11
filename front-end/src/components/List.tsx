import React from 'react';
import '../css/List.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Card from './Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

interface Myprops
{
}
interface Mystate
{
    title: string;
    cards: JSX.Element[];
    titleComponent: JSX.Element;
    isEditing: boolean;
}

class List extends React.Component<Myprops, Mystate>
{
    constructor(props: Myprops)
    {
        super(props);
        this.state = {
            title: "title",
            cards: [],
            titleComponent: <TextField id="outlined-search" label="Search field" variant="outlined" onBlur={this.notEditing.bind(this)} />,
            isEditing: true
        };
    }

    addNewCard(e: any)
    {
        console.log("add new card");
        const { cards } = this.state;

        let newCard = <Card></Card>;

        cards.push(newCard);

        this.setState({
            cards: cards
        })
    }

    rename(e: any)
    {
        this.setState({
            title: e.target.value
        });
    }

    editing(e: any)
    {
        
            
        this.setState({
            isEditing: true,
        });
    }

    notEditing(e: any)
    {
        this.setState({
            isEditing: false,
            title: e.target.value
        });
    }


    render()
    {
        const { cards, isEditing, title } = this.state;
        let { titleComponent } = this.state;

        if (isEditing)    
            titleComponent = <TextField id="outlined-title" label="title" variant="outlined" onBlur={this.notEditing.bind(this)} onChange={this.rename.bind(this)} value={title} />          
        else
            titleComponent = <label onClick={this.editing.bind(this)}>{title}</label>

        return (
            <div className="listBox">

                <div>
                    {titleComponent}
                </div>

                <div>
                    {cards}
                </div>
                <Button variant="contained" color="primary" onClick={this.addNewCard.bind(this)}>
                    add new card
		 		</Button>
            </div>
        )
    }
}

export default List;
