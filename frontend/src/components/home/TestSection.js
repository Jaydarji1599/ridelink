import React, { Component } from "react"

import HelpCard from "./testComponents/HelpCard.js"
import UserProfileCard from "./testComponents/UserProfileCard.js"
import {Accordion} from 'react-bootstrap-accordion';

export class TestSection extends Component {

    render() {
        return (
            <>
                
                <HelpCard />
                <UserProfileCard />
                <Accordion title="test 1">
                    This is the test accordion.
                </Accordion>
            </>
        )
    }
}