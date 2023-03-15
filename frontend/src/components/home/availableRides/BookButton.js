import { Component } from "react";
import { Button } from "react-bootstrap";


export class BookButton extends Component {

    state = {
        disable: this.props.disable,
        
    }


    render() {
        return (
            <>
                <Button variant="success" name={item.id} className="btn-block" size="md" onClick={this.submitPassenger}>
                    Book
                </Button>
            </>
        )
    }
}