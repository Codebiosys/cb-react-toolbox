import React from 'react';
import PropTypes from 'prop-types';
import { toUpper } from 'lodash';
import {
  Glyphicon,
} from 'react-bootstrap';

import 'react-datetime/css/react-datetime.css';


const SortGlyph = ({
  field,
  orderBy,
  type,
  reverse,
  changeSortOrder,
  reverseSortOrder,
}) => {
  const updateSort = () => {
    if (toUpper(field) === toUpper(orderBy)) {
      reverseSortOrder(reverse);
    } else {
      changeSortOrder(field);
    }
  };
  return (
    <Glyphicon
      onClick={() => updateSort()}
      glyph={toUpper(field) === toUpper(orderBy) && reverse ? `sort-by-${type}-alt` : `sort-by-${type}`}
      className={toUpper(field) === toUpper(orderBy) ? 'text-success' : ''}
    />
  );
};

SortGlyph.propTypes = {
  field: PropTypes.string.isRequired,
  orderBy: PropTypes.string,
  type: PropTypes.string,
  reverse: PropTypes.bool,
  changeSortOrder: PropTypes.func.isRequired,
  reverseSortOrder: PropTypes.func.isRequired,
};

SortGlyph.defaultProps = {
  orderBy: '',
  reverse: false,
  type: 'alphabet',
};

export default SortGlyph;
