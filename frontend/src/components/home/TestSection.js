import React, { Component } from "react"

import HelpCard from "./testComponents/HelpCard.js"
import UserProfileCard from "./testComponents/UserProfileCard.js"

export class TestSection extends Component {

    render() {
        return (
            <>
                
                <HelpCard />
                <UserProfileCard />
            </>
        )
    }
}