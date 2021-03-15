import React from 'react';
import '../css/List.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Card from './Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

interface Myprops
{
    id: number;
    title: string;
    order: number;
}
interface Mystate
{
    title: string;
    cards: JSX.Element[];
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
            isEditing: true
        };
    }

    componentDidMount()
    {

    }

    addNewCard(e: any)
    {
        console.log("add new card");
        const { cards } = this.state;

        let newCard = <Card/>;

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

    clickList(e: any)
    {
        const { id } = this.props;
        console.log("id:", id);
    }

    editing(e: any)
    {
        this.setState({
            isEditing: true
        });
    }

    notEditing(e: any)
    {
        if (e.target.value === "")
            e.target.value = "title";

        const { title } = this.state;
        const data = { title: title };

        fetch('http://localhost:8000/boards/lists/', {
            method: "PUT",
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
        })

        this.setState({
            isEditing: false,
            title: e.target.value
        });
    }


    render()
    {
        const { cards, isEditing, title } = this.state;
        let titleComponent = null;

        if (isEditing)
            titleComponent = <TextField id="outlined-title" variant="outlined" onBlur={this.notEditing.bind(this)} onChange={this.rename.bind(this)} onClick={this.clickList.bind(this)} value={title} />
        else
            titleComponent = <label onClick={this.editing.bind(this)}>{title}</label>

        return (
            <div className="list-wrapper">

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
