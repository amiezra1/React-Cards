import PropTypes from 'prop-types';

export const addressPropTypes = PropTypes.shape({
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  houseNumber: PropTypes.number.isRequired,
}).isRequired;

export const cardComponentPropTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  img: PropTypes.string,
  alt: PropTypes.string,
  phone: PropTypes.string.isRequired,
  address: addressPropTypes,
  cardNumber: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onCard: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  liked: PropTypes.bool,
};
