import PropTypes from 'prop-types';

export const dataPropType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.number.isRequired,
    key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
  })
);

export const stylePropType = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.number, PropTypes.string])
);
