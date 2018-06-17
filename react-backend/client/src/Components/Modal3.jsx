import React from 'react';
import PropTypes from 'prop-types';

class Modal3 extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
      console.log('Error in modal')
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 700,
      minHeight: 400,
      maxHeight: 600,
      overflowY: 'auto',
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop backdropStyle" style={backdropStyle}  >
        <div className="modal modalStyle" style={modalStyle}>
            <button onClick={this.props.onClose}>
              Close
            </button>
          {this.props.children}
          <div className="footer">
          </div>
        </div>
      </div>
    );
  }
}

Modal3.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal3;
