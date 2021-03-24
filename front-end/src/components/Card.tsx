import React from 'react';
import '../css/Card.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

interface Myprops
{
    id: number;
    title: string;
    order: number;
    to_list: number;
    callList: Function;
}
interface Mystate
{
    value: string;
    isEditing: boolean;
    isDeletable: boolean;
}


class Card extends React.Component<Myprops, Mystate>
{
    constructor(props: Myprops)
    {
        super(props);
        const { title } = this.props;
        this.state = {
            value: title,
            isEditing: false,
            isDeletable: true
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
            this.setState({
                isEditing: false
            });
        })
    }

    displayDeleteButton(e: any)
    {
        this.setState({
            isDeletable: true
        })
    }

    removeDeleteButton(e: any)
    {

    }

    deleteCard(e: any)
    {
        const { id, callList } = this.props;
        callList(id);
    }


    render()
    {
        const { isEditing, value, isDeletable } = this.state;

        let deleteButton = null;

        if (isDeletable)
            deleteButton =
                <IconButton aria-label="delete" onClick={this.deleteCard.bind(this)}>
                    <DeleteIcon />
                </IconButton>
        else
            deleteButton = null;


        let cardComponent = null;

        if (isEditing)
            cardComponent = <TextField id="outlined-title" variant="outlined" onBlur={this.notEditing.bind(this)} onChange={this.cardRename.bind(this)} value={value} />
        else
            cardComponent =
                <div className="card" onMouseOver={this.displayDeleteButton.bind(this)} onMouseOut={this.removeDeleteButton.bind(this)}>
                    <span className="card-title" onClick={this.editing.bind(this)}>
                        {value}
                    </span>
                    <div className="delete-button">
                        {deleteButton}
                    </div>
                </div>


        return (
            <div>
                {cardComponent}
            </div>
        )
    }
}

export default Card;
