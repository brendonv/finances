import React, { Component, PropTypes } from 'react';;
import { connect } from 'react-redux';
import { linkAccount } from '../actions';

class Link extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    componentDidMount() {
    }

    componentWillReceiveProps() {
    }

    render() {
    	let username, password;
    	return (
			<div className="overlay">
				<form onSubmit={ e => {
					e.preventDefault();
			        // if (!input.value.trim()) {
			        //   return;
			        // }
			        console.log(username, password);
			        // dispatch(linkAccount({input}.value));
			        // input.value = '';
				}}>
				    <div className="link-input">
				    	<input value={username} placeholder="Bank username" />
				    	<input value={password} placeholder="Bank password" />
				    	<button className="link"> Link to bank account </button>
				    </div>
				</form>
			</div>
		);
    }
};

const mapStateToProps = state => {
	const { user } = state;
	return user;
};

export default connect(mapStateToProps)(Link);
