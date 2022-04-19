import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { id, name, handleChange, type, placeholder, label, className } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <input
          className={ className }
          name={ name }
          id={ id }
          type={ type }
          data-testid={ id }
          placeholder={ placeholder }
          onChange={ handleChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  id: PropTypes.string,
  handleChange: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
}.isRequired;
