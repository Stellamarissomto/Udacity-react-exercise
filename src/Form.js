import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Form extends Component {
 state = {
    user: {
      firstName: '',
      lastName: '',
      userName: '',
    },
    userExists: false,
  };

contactExists = currUser => {
  const users = this.props.users;
  for (let user of users) {
      if (user.userName === currUser) {
        return true;
      }
    }
    return false

};

 handleSubmit = event => {
    event.preventDefault();
    const userExists = this.contactExists(this.state.user.userName);

    if (!userExists) {
      this.props.onAdd(this.state.user);
    }

    this.setState(() => ({
      userExists,
    }));
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState(currState => ({
      ...currState,
      user: {
        ...currState.user,
        [name]: value,
      },
    }));
  };

  isDisabled = () => {
    const { firstName, lastName, userName } = this.state.user;
    return firstName === '' || lastName === '' || userName === '';
  };

  render() {
    const { firstName, lastName, userName } = this.state.user;

    return (
      <div>
      
        <h1>New User</h1>
        <form onSubmit ={this.handleSubmit} >
          <div>
            <input
              type="text"
              name="firstName" //name should be the same as state name in users.
              placeholder="Enter First Name"
              value={firstName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              name="userName"
              placeholder="Enter username"
              value={userName}
              onChange={this.handleInputChange}
            />
          </div>
          <button disabled={this.isDisabled()}>Add</button>
        </form>
        {this.state.userExists ? (
          <p className="error">You cannot add a user that already exists.</p>
        ) : (
          ''
        )}
        
      </div>

     
    );
  }
}

Form.propTypes = {
  users: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired
}


export default Form;