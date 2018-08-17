import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';

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
    const playerSummary = this.props.playerSummary;
    const success = this.props.success;

    return (
      <div>
        <form className="column" onSubmit={this.handleSubmit}>
          <label className="header" htmlFor="username">
            {this.props.label}
          </label>
          <input
            id="username"
            placeholder="steam username"
            type="text"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="button"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </form>

        {success === 1 && playerSummary !== null ? (
          <PlayerPreview
            avatar={
              playerSummary.avatarfull !== null && playerSummary.avatarfull
            }
            username={playerSummary.personaname}
            playerSummary={playerSummary}
            id="player"
          />
        ) : null}

        {success === 42 && playerSummary !== null ? (
          <PlayerPreview
            avatar="https://www.computerhope.com/jargon/e/error.gif"
            username="User not found"
            id="player"
          />
        ) : null}
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
