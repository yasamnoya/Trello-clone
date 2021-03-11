import React from 'react';
import '../css/List.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Input from '@material-ui/core/Input';

interface Myprops
{
    
}
interface Mystate
{
    value: string
    id: number
}


class Card extends React.Component<Myprops, Mystate>
{
    constructor(props: Myprops)
    {        
        super(props);
        this.state = {
            value: "",
            id: -1
        };
    }
    

    cardRename(e: any)
    {
        console.log(e.target.value);
        this.setState({
            value: e.target.value
        });
    }
    render()
    {
        return (
            <div>
                <Input placeholder="Card name" inputProps={{ 'aria-label': 'description' }} onChange={this.cardRename.bind(this)} />
            </div>
        )
    }
}

export default Card;
