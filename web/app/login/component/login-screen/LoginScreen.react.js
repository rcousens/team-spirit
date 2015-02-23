var React = require('react');
var LoginActions = require('../../login-actions.js');

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var LoginScreen = React.createClass({
    handleUsernameChange: function(e) {
        LoginActions.emailChange(e.target.value);
        this.enableLogin();
    },
    getInitialState: function(e) {
        return {
            loginEnabled: false
        }
    },
    handlePasswordChange: function(e) {
        this.enableLogin();
    },
    enableLogin: function(e) {
        this.setState({'loginEnabled': $(this.refs.username.getDOMNode()).val().length >= 6 && re.test(this.props.email) && $(this.refs.password.getDOMNode()).val().length >= 8});
    },
    render: function () {
        var csrf_token = window.TS.embed.csrf_token;
        var message = this.props.message ? (<p className="help-block">{this.props.message}</p>) : '';
        return (
            <div className="row">
                <div className="jumbotron">
                    <h2 className="text-center">Login</h2>
                    <form method="POST" action={window.Routing.generate('security_check')}>
                        <input type="hidden" name="_csrf_token" value={csrf_token} />
                        <div className="form-group">
                            <label htmlFor="username">Email Address</label>
                            <input ref="username" type="email" className="form-control" id="username" name="_username" defaultValue={this.props.email} onChange={this.handleUsernameChange} placeholder="Email Address" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input ref="password" type="password" className="form-control" id="password" name="_password" onChange={this.handlePasswordChange} placeholder="Password" />
                        </div>
                        <br />
                        {message}
                        <button disabled={!this.state.loginEnabled} id="_submit" name="_submit" type="submit" className="btn btn-primary">Login<i className="fa fa-fw fa-sign-in"></i></button>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = {
    LoginScreen: LoginScreen
};