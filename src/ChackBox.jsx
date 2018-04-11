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
  let ariaChecked;
  switch (checked) {
    case NO:
      icon = 'square';
      ariaChecked = 'false';
      break;
    case SORTA:
      icon = 'minus-square';
      ariaChecked = 'mixed';
      break;
    case YES:
      icon = 'check-square';
      ariaChecked = 'true';
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
      aria-checked={ariaChecked}
      tabIndex={tabIndex}
      onClick={onClick}
    ><Icon name={icon} />
    </div>
  );
};

ChackBox.propTypes = propTypes;
ChackBox.defaultProps = defaultProps;

export default ChackBox;
