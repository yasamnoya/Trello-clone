import React from 'react';
import '../css/Card.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Input from '@material-ui/core/Input';
import { TextField } from '@material-ui/core';

interface Myprops
{

}
interface Mystate
{
    value: string;
    id: number;
    isEditing: boolean;
}


class Card extends React.Component<Myprops, Mystate>
{
    constructor(props: Myprops)
    {
        super(props);
        this.state = {
            value: "",
            id: -1,
            isEditing: true
        };
    }


    cardRename(e: any)
    {
        console.log(e.target.value);
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
        this.setState({
            isEditing: false,
            value: e.target.value
        });
    }

    render()
    {
        const { isEditing, value, id } = this.state;

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
