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
        const { title } = this.props;
        this.state = {
            title: title,
            cards: [],
            isEditing: true
        };
    }

    componentDidMount()
    {
        const { id } = this.props;
        fetch('http://localhost:8000/boards/lists/' + id.toString() + '/cards/', {
            method: "GET",
        }).then(res =>
        {
            return res.json();
        }).then(data =>
        {
            data.forEach((item: any) =>
            {
                console.log(item);
                this.initialCard(item);
            })
        })
    }

    initialCard(item: any)
    {
        let { cards } = this.state;

        let cardid = -1, title = "title", order = -1, to_list = -1;
        cardid = item.id;
        title = item.title;
        order = Number(item.order);
        to_list = Number(item.to_list);

        const newCard = <Card id={cardid} title={title} order={order} to_list={to_list} />
        cards.push(newCard);
        this.setState({ cards: cards });
    }

    addNewCard(e: any)
    {
        console.log("add new card");
        const { cards } = this.state;
        const { id } = this.props;

        const data = { title: "title", to_list: id };
        let cardid = -1, title = "title", order = -1, to_list = -1;
        fetch('http://localhost:8000/boards/cards/', {
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

            cardid = data.id;
            title = data.title;
            to_list = data.to_list;
            order = data.order;

            const newCard = <Card id={cardid} title={title} to_list={to_list} order={order} />;
            cards.push(newCard);
            this.setState({
                cards: cards
            })
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
        const { title } = this.props;
        console.log("title:", title);
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
