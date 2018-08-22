import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState(() => {
      return {
        username: value,
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  };

  render() {
    return (
      <div>
        <form className="column" onSubmit={this.handleSubmit}>
          <div className="inputbox" style={{margin: '5px', padding: 10}}>
            <TextField
              id="username"
              label="Username"
              type="text"
              autoComplete="off"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          <div className="buttons">
            <Button
              style={{margin: '5px'}}
              variant="contained"
              color="primary"
              className="button"
              type="submit"
              disabled={!this.state.username}
            >
              Search
            </Button>

            <Button
              style={{margin: '5px'}}
              variant="contained"
              color="secondary"
              className="reset"
              onClick={event => {
                this.props.handleReset();
                this.setState({username: ''});
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

UserInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

UserInput.defaultProps = {
  label: 'Username',
};

export default UserInput;
