import Nav from 'react-bootstrap/Nav';
import React from 'react';
import AppBar from '../../global/AppBar';
import Colors from '../../global/Colors';

const RiderNaviBar = () => {
    const navLinkstyle = Colors.navbarLink;

    return (
        <AppBar isLoggedIn={true}>
            <Nav className="justify-content-end">
                <Nav.Link href="/rider/deliveries" style={navLinkstyle}>Deliveries</Nav.Link>
                <Nav.Link href="/rider/schedule" style={navLinkstyle}>Schedule</Nav.Link>
                <Nav.Link href="/rider/salary_summary" style={navLinkstyle}>Stats</Nav.Link>
            </Nav>
        </AppBar>
    )
};

export default RiderNaviBar;
