import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'react-fa';

export const NO = 'no';
export const SORTA = 'sorta';
export const YES = 'checked';

const STATUS_CHOICES = [NO, SORTA, YES];

const propTypes = {
  tabIndex: PropTypes.number,
  checked: PropTypes.oneOf(STATUS_CHOICES).isRequired,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  tabIndex: 0,
};

/**
 * A faux check box
 *
 * @typedef {Component} ChackBox
 */
const ChackBox = ({
  tabIndex,
  checked,
  onClick,
}) => {
  let icon;

  switch (checked) {
    case NO:
      icon = 'square';
      break;
    case SORTA:
      icon = 'minus-square';
      break;
    case YES:
      icon = 'check-square';
      break;
    default:
      icon = 'exclamation-circle';
      break;
  }

  return (
    <div
      style={{
        cursor: 'pointer',
        display: 'inline-block',
      }}
      className="chackbox"
      role="checkbox"
      aria-checked={status !== 'clear'}
      tabIndex={tabIndex}
      onClick={onClick}
    ><Icon name={icon} />
    </div>
  );
};

ChackBox.propTypes = propTypes;
ChackBox.defaultProps = defaultProps;

export default ChackBox;
