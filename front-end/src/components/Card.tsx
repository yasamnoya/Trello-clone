import React from 'react';
import '../css/Card.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Input from '@material-ui/core/Input';
import { TextField } from '@material-ui/core';

interface Myprops
{
    id: number;
    title: string;
    order: number;
    to_list: number;
}
interface Mystate
{
    value: string;
    isEditing: boolean;
}


class Card extends React.Component<Myprops, Mystate>
{
    constructor(props: Myprops)
    {
        super(props);
        const { title } = this.props;
        this.state = {
            value: title,
            isEditing: true
        };
    }


    cardRename(e: any)
    {
        this.setState({
            value: e.target.value
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
        if (e.target.value === "")
            e.target.value = "card";

        const { id } = this.props;
        const { value } = this.state;
        const data = { title: value };

        fetch('http://localhost:8000/boards/cards/' + id.toString() + '/', {
            method: "PATCH",
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
            value: e.target.value
        });
    }

    render()
    {
        const { isEditing, value } = this.state;

        let cardComponent = null;

        if (isEditing)
            cardComponent = <TextField id="outlined-title" variant="outlined" onBlur={this.notEditing.bind(this)} onChange={this.cardRename.bind(this)} value={value} />
        else
            cardComponent =
                <div className="card" onClick={this.editing.bind(this)}>
                    {value}
                </div>

        return (
            <div>
                {cardComponent}
            </div>
        )
    }
}

export default Card;
