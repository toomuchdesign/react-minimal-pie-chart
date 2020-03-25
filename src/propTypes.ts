import PropTypes from 'prop-types';

export const stylePropType = PropTypes.objectOf(
  PropTypes.oneOfType([PropTypes.number, PropTypes.string])
);

export const dataPropType = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.number.isRequired,
    color: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: stylePropType,
  })
);
