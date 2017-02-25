import { connect } from 'react-redux';
import Signup from './components/Sigup';

 var linkHandler = Plaid.create({
    env: 'tartan',
    clientName: 'Client Name',
    key: 'test_key',
    product: 'auth',
    onLoad: function() {
      // The Link module finished loading.
      console.log("__PLAID__ on load");
    },
    onSuccess: function(public_token, metadata) {
    	console.log("__PLAID__ on success");
      // Send the public_token to your app server here.
      // The metadata object contains info about the institution the
      // user selected and the account ID, if selectAccount is enabled.
    },
    onExit: function(err, metadata) {
    	console.log("__PLAID__ on exit");
      // The user exited the Link flow.
      if (err != null) {
        // The user encountered a Plaid API error prior to exiting.
      }
      // metadata contains information about the institution
      // that the user selected and the most recent API request IDs.
      // Storing this information can be helpful for support.
    }
  });

const mapStateToProps = state => {
	return {

	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignupClick: (id) => {
        // dispatch(toggleTodo(id))
        conosle.log("SIGNUP");
        //linkhandler.open('bofa')
    }
  }
}

const PlaidSignup = connect(
	mapStateToProps,
	mapDispatchToProps
)(Signup);

export default PlaidSignup;