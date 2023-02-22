import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, auth, ...rest}) => {
    if (auth.isLoading) {
        return <h6>Loading ...</h6>
    }
    else if (!auth.isAuthenticated) {
        return <Navigate to="/login" />
    }
    else {
        return <Outlet />
    }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);