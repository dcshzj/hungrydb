import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import CustomerNavBar from './CustomerNavBar'
import Dashboard from './dashboard/CustomerDashboard';
import Menu from './order/Menu';
import Cart from './cart/Cart';
import CompleteOrder from './ordersubmission/CompleteOrder';
import Review from './revieworder/Review';
import OrderHistory from './orderhistory/OrderHistory';
import ReviewHistory from './reviews/ReviewHistory';
import PromosPage from './promotions/PromosPage';
import Restaurants from './order/Restaurants';
import RestaurantReviews from './order/RestaurantReviews';
import ReadOnlyCart from './readonlycart/ReadOnlyCart';
import FoodReviews from './order/FoodReviews';
import secureStorage from '../utilities/HungrySecureStorage';

class Index extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.handleRecordCosts = this.handleRecordCosts.bind(this);
        this.resetFoods = this.resetFoods.bind(this);
        this.state = { orders: JSON.parse(secureStorage.getItem('foods')) };
        console.log("Active order present: " + secureStorage.getItem('active_order_present'));
    }

    // State passed upward from FoodModal through MenuItem & Menu to this
    handleSubmitOrder(e, newFood, picture) {
        let updatedOrders = this.state.orders === null ? {} : this.state.orders;
        let numAvailable = newFood.daily_limit - newFood.num_orders;
        console.log(numAvailable);
        if (newFood.f_name in updatedOrders) {
            let orderedQuantity = parseInt(updatedOrders[newFood.f_name]["quantity"])
                + parseInt(newFood.quantity);
            if (orderedQuantity <= numAvailable) {
                updatedOrders[newFood.f_name]["quantity"] = orderedQuantity;
            } else {
                alert("Your order has exceeded the available number.");
                e.preventDefault();
                return false;
            }
        } else {
            if (newFood.quantity <= numAvailable) {
                updatedOrders[newFood.f_name] = {};
                updatedOrders[newFood.f_name]["picture"] = picture;
                updatedOrders[newFood.f_name]["price"] = newFood.price;
                updatedOrders[newFood.f_name]["quantity"] = newFood.quantity;
                updatedOrders[newFood.f_name]["id"] = newFood.id;
            } else {
                alert("Your order has exceeded the available number in stock.");
                e.preventDefault();
                return false;
            }
        }
        console.log(updatedOrders);

        this.setState({ orders: updatedOrders });
        // Persist order info in local browser storage
        secureStorage.setItem('foods', JSON.stringify(updatedOrders));
        console.log(secureStorage.getItem('foods'));
        return true;
    }

    resetFoods() {
        this.setState({ orders: JSON.parse(secureStorage.getItem('foods')) });
    }

    handleRecordCosts(latestTotalCost, latestDeliveryFee, latestAmount) {
        secureStorage.setItem('total_price', latestTotalCost + latestDeliveryFee);
        secureStorage.setItem('delivery_fee', latestDeliveryFee);
        secureStorage.setItem('amount_due', latestAmount);
    }

    render() {
        if (secureStorage.getItem('active_order_present')) {
            window.location.href = "/customer/order_in_progress";
            return (
                <Router>
                    <Route exact path="/customer/order_in_progress" render={() => <ReadOnlyCart />} />
                </Router>
            )
        } else {
            return (
                <Router>
                    <CustomerNavBar />
                    {/* <h6>{JSON.stringify(props.info)}</h6> */}
                    <Route exact path="/" render={() => <Dashboard currentUser={this.props.info} />} />

                    <Route exact path="/customer/order"
                        render={() => <Restaurants onResetOrder={this.resetFoods} />} />

                    <Route exact path={"/customer/order/:rid/menu"}>
                        <Menu onSubmitOrder={this.handleSubmitOrder} />
                    </Route>

                    <Route exact path="/restaurants/:rid/reviews" render={() => <RestaurantReviews />} />
                    <Route exact path="/food/:food_name/reviews" render={() => <FoodReviews />} />

                    <Route exact path="/customer/cart">
                        <Cart orders={this.state.orders} points={this.props.info.points}
                            onOrderSubmit={this.handleRecordCosts} />
                    </Route>

                    <Route exact path="/customer/complete_order" render={() => <CompleteOrder />} />

                    <Route exact path="/customer/history" render={() => <OrderHistory />} />
                    <Route exact path="/customer/reviews" render={() => <ReviewHistory />} />
                    <Route exact path="/customer/promotions" render={() => <PromosPage
                        location="customer" />} />
                </Router>
            )
        }
    }
}

export default Index;
