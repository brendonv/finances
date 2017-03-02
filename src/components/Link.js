import React, { Component, PropTypes } from 'react';;
import { connect } from 'react-redux';
import { postLinkAccount } from '../actions';

class Link extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    constructor(props) {
    	super(props);
    	this.state = { username: '', password: '' };
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
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
        
        if (!this.state.username.trim() || !this.state.password.trim()) {
          return;
        }
        
        dispatch(postLinkAccount(user, this.state));
        
        this.setState({
        	username: '',
        	password: ''
        });    	
    }

    render() {

    	return (
			<div className="overlay">
				<form onSubmit={this.handleSubmit}>
				    <div className="link-input">
				    	<input name="username" value={this.state.username} placeholder="Bank username" onChange={this.handleChange} />
				    	<input name="password" value={this.state.password} placeholder="Bank password" onChange={this.handleChange} type="password" />
				    	<button className="link"> Link to bank account </button>
				    </div>
				</form>
			</div>
		);
    }
};

const mapStateToProps = state => {
	const { auth } = state;
    const { user } = auth;
	return { user };
};

export default connect(mapStateToProps)(Link);
