import React, { Component } from "react"
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { connect } from 'react-redux';
import HelpCard from "./testComponents/HelpCard";

export class HelpSection extends Component {
    static propTypes = {
        
    }

    render() {
        return (
            <HelpCard />
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})
    
export default connect(mapStateToProps)(HelpSection);