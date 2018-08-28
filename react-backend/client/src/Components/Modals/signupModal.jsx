import React from 'react'
import PropTypes from "prop-types";

class Modal extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
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
            maxWidth: 350,
            minHeight: 0,
            margin: '0 auto',
            padding: 20,
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column',
        };

        

        return <div className="backdrop backdropStyle" style={backdropStyle}>
            <div className="modal modalStyle modalFlex" style={modalStyle}>
            <div className='modal-header'></div>
                {this.props.children}
                <div className="footer">
                <button onClick={this.props.onSignup}>Signup</button>
                <button onClick={this.props.onClose}>Close</button>
                <br/>
                <br/>
            <div className='modal-footer'></div>
            </div>
            </div>
        </div>;
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Modal;
