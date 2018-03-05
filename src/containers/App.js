import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuth, accessToken, selectors as userSelectors } from '../modules/user';
import Nav from '../components/Nav';
import AccountsView from '../containers/AccountsView';
import ErrorModal from '../components/Error';

class App extends Component {

    constructor (props) {
        super(props);
        this.state = { username: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeError = this.removeError.bind(this);

        const { onSignupClick } = this.props;

        this.handleCLick = this.handleClick.bind(this);
        this.plaidClient = Plaid.create({
            apiVersion: 'v2',
            clientName: "Finance App",
            env: 'sandbox',
            key: PLAID_PUBLIC_KEY,
            product: ['transactions'],
            onLoad: () => console.log("PLAID CLIENT ONLOAD"),
            onSuccess: onSignupClick,
            onEvent: (eventName, metadata) => console.log("PLAID CLIENT ONEVENT", eventName, metadata)
        })
    }

    componentDidMount () {
        if (this.props.loggedIn) {
            console.log("LOGGED IN");
        }
    }

    componentWillReceiveProps () {
    }

    handleClick () {
        console.log("HANDLE CLICK");
        this.plaidClient.open();
    }

    handleChange (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
          [name]: value
        });
    }

    handleSubmit (e) {
        const { dispatch, user } = this.props;
        e.preventDefault();
        
        if (!this.state.username.trim()) {
          return;
        }
        
        dispatch(checkAuth(this.state.username));
        
        this.setState({
            username: ''
        });     
    }

    removeError (e) {
        console.log("Remove error modal");
    }

    render () {
        const { loggedIn, error } = this.props;
        return (
            <div className="app">
                <Nav/>
                {loggedIn ? ( 
                    <AccountsView />
                ) : (
                    <div className="signin">
                        <button className="button" onClick={this.handleClick.bind(this)}> Link an Account </button>
                    </div>

                )}
                { error && <ErrorModal header="Error signing in." body={error} remove={this.removeError} /> }
            </div>
        );
    }

}

App.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    onSignupClick: PropTypes.func.isRequired,
    error: PropTypes.object
};

const mapStateToProps = state => ({
    loggedIn: userSelectors.isLoggedIn(state)
});

const mapDispatchToProps = dispatch => ({
    onSignupClick: (publicToken, metadata) => dispatch(accessToken(publicToken, metadata))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
