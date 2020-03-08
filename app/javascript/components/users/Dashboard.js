import React from 'react';
import NavigationBar from './common/NavigationBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

const Dashboard = (props) => {
    let hasAdmin = props.isAdmin ? "You currently have the admin role." : "You do not have the admin role."

    return (
        <React.Fragment>
            <NavigationBar/>
            <h2 className="dashboard-welcome-user">Hello {props.currentUser.username}!</h2>
            <p>{hasAdmin}</p>
        </React.Fragment>
    )
};

export default Dashboard;