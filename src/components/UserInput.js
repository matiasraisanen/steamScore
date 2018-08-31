import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      steamid64: '',
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

  handleChangeSteamID64 = event => {
    const value = event.target.value;
    this.setState(() => {
      return {
        steamid64: value,
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username,
      this.state.steamid64,
    );
  };

  render() {
    return (
      <div>
        <form className="column" onSubmit={this.handleSubmit}>
          <div className="inputbox" style={{margin: '5px', padding: 10}}>
            <InputLabel shrink htmlFor="age-label-placeholder">
              Search by
            </InputLabel>
            <TextField
              disabled={this.state.steamid64 ? true : false}
              id="username"
              label="Username"
              type="text"
              autoComplete="off"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>

          <div>OR</div>

          <div className="inputboxSteamID">
            <InputLabel shrink htmlFor="age-label-placeholder">
              Search by
            </InputLabel>
            <TextField
              disabled={this.state.username ? true : false}
              id="steamid64"
              label="SteamID64"
              type="text"
              autoComplete="off"
              value={this.state.steamid64}
              onChange={this.handleChangeSteamID64}
            />
          </div>

          <div style={{marginTop: '15px'}} className="buttons">
            <Button
              style={{margin: '5px'}}
              variant="contained"
              color="primary"
              className="button"
              type="submit"
              disabled={!this.state.username && !this.state.steamid64}
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
                this.setState({steamid64: ''});
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
