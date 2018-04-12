import React from 'react';
import PropTypes from 'prop-types';
import {
  DropdownButton,
  Label,
  MenuItem,
  Button,
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import { uniqueId, filter } from 'lodash';

const propTypes = {
  currentState: PropTypes.shape({
    codename: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  availableTransitions: PropTypes.arrayOf(PropTypes.shape({
    codename: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    implicit: PropTypes.bool.isRequired,
    target: PropTypes.shape({
      codename: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  })),
  onSelect: PropTypes.func.isRequired,
};

const defaultProps = {
  availableTransitions: [],
};

/**
 * @typedef {React.Component} TransitionSelect
 *
 * This component composes a Bootstrap <DropdownButton /> to use for transitioning
 * states for an object.
 *
 * @param {object} currentState - the current state to display as the Dropdown title
 * @param {object[]} availableTransitions - list of available transitions for the current object
 * @param {Function} onSelect - callback to invoke when a value is clicked.
 *    The function will be be passed (eventKey, event).
 */
const TransitionSelect = ({
  currentState,
  availableTransitions,
  onSelect,
}) => {
  if (availableTransitions && availableTransitions.length) {
    const transitions = filter(availableTransitions, transition => !transition.implicit);
    return (
      <DropdownButton
        title={currentState.label}
        id={`transition-select-${currentState.codename}`}
      >
        {transitions.map(transition => (
          <MenuItem key={uniqueId()} eventKey={transition.codename} onSelect={onSelect}>
            {transition.label} <Icon name="arrow-right" /> <Label>{transition.target.label}</Label>
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }
  return (<Button disabled>{currentState.label}</Button>);
};

TransitionSelect.propTypes = propTypes;
TransitionSelect.defaultProps = defaultProps;

export default TransitionSelect;
