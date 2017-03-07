import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../reducers/auth';
import Nav from '../components/Nav';
import Finance from '../containers/Finance';
import ErrorModal from '../components/Error';

class App extends Component {
    static propTypes = {
        loggedIn: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
        error: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = { username: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeError = this.removeError.bind(this);
    }

    componentDidMount() {
        // if (!this.props.loggedIn && !this.props.isFetching) {
        //     this.props.dispatch(checkAuth());
        // } else 
        if (this.props.loggedIn) {
            console.log("LOGGED IN");
        }
    }

    componentWillReceiveProps() {
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
          [name]: value
        });
    }

    handleSubmit(e) {
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

    removeError(e) {
        console.log("Remove error modal");
    }

    render() {
        const { loggedIn, error } = this.props;
        return (
            <div className="app">
                <Nav/>
                {loggedIn ? ( 
                    <Finance/>
                ) : (
                    <div className="signin">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-container">
                                <input className="input" name="username" value={this.state.username} placeholder="Your username" onChange={this.handleChange} />
                                <button className="button" > Signin </button>
                            </div>
                        </form>
                    </div>

                )}
                { error && <ErrorModal header="Error signing in." body={error} remove={this.removeError} /> }
            </div>
        );
    }

}

const mapStateToProps = state => {
    const { auth } = state;

    const  {
        isFetching,
        loggedIn,
        error
    } = auth;

    return {
        loggedIn,
        isFetching,
        error
    };
};



export default connect(mapStateToProps)(App);
