import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';

const mapStateToProps = state => ({
  notifications: state.notifications,
});

/**
 * @typedef {Class} Messenger
 *
 * @desc Notification management via redux. Include the notification in the outer
 * scope of your application, and then dispatch the appropriate actions.
 *
 * @see https://github.com/gor181/react-notification-system-redux
 */
export default connect(mapStateToProps)(Notifications);
