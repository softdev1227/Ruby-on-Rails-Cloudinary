import React from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router-dom';
import style from './modal_style';


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      modalOpen: false,
      logIn: false,
    };

    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
    this.switchForms = this.switchForms.bind(this);
  }

  update(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    if (this.state.logIn) {
      this.props.login(user);
    } else {
      this.props.signup(user);
    }
  }

  guestLogin(e) {
    e.preventDefault();
    const user = {username: 'guest', password: 'password'};
    this.props.login(user);
  }

  renderErrors() {
    return(
      <div className="session-errors">
      <ul>
        {this.props.errors.map((error, i) =>(
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
      </div>
    );
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  openModal(bool) {
    this.setState({
      modalOpen: true,
      logIn: bool
    });
  }

  formHeader() {
    return (this.state.logIn) ? <h3>Log in to Baehance</h3> : <h3>Join Baehance</h3>;
  }

  formButton() {
    return (this.state.logIn) ? "Log in" : "Sign up";
  }

  switchForms() {
    this.setState({
      logIn: !this.state.logIn
    });
  }

  switchButton() {
    return (this.state.logIn) ? <p>Don't have an account? Sign up</p> : <p>Already have an account? Log in</p>;
  }

  emailInput() {
    if (!this.state.logIn) {
      return (
        <input type="text"
          className="login-input"
          placeholder="Email"
          value={this.state.email}
          onChange={this.update('email')}
        />
      );
    }
  }

  render() {
    return (
      <nav className="nav-right">

        <div className="header-group">
          <button className="header-button" onClick={this.openModal.bind(this, true)}>Login</button>
          <button className="header-button" onClick={this.openModal.bind(this, false)}>Sign up</button>
        </div>

        <Modal
          contentLabel="Modal"
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={style}>

          <div className="login-form-container">
            <div className="x-button">
              <button onClick={this.closeModal}><i aria-hidden="true"></i></button>
            </div>

            <form className="login-form-box">
              {this.formHeader()}
              {this.renderErrors()}

              <div className="login-form">
                <input type="text"
                  className="login-input"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.update('username')}
                />

                {this.emailInput()}

                <input type="password"
                  className="login-input"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.update('password')}
                />
              </div>

              <div className="session-button-container">
                <button className="session-button" onClick={this.handleSubmit}>{this.formButton()}</button>
                <button className="session-button" onClick={this.guestLogin}>Guest</button>
              </div>

              <a
                href="/#"
                className="switch-forms"
                onClick={this.switchForms}
              >
                {this.switchButton()}
              </a>
            </form>
          </div>
        </Modal>
      </nav>
    );
  }

}

export default withRouter(SessionForm);