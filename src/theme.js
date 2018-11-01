import React from 'react';
import PropTypes from 'prop-types';

export default () => (Comp) => {
  const Wrapped = (props, context) => {
    return <Comp {...props} {...context} />;
  };
  Wrapped.contextTypes = {
    theme: PropTypes.object.isRequired,
    activeTheme: PropTypes.func.isRequired,
  };

  return Wrapped;
};
