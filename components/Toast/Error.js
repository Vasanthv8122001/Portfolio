import React from 'react';

const Error = ({ hiddenState, alertMessage }) => {
  return (
    <div hidden={hiddenState}>
      <div
        className="position-fixed start-50 translate-middle-x top-100px"
        style={{ zIndex: 9999 }}
      >
        <div
          className="d-flex align-items-center justify-content-center px-4 py-2 rounded shadow"
          style={{
            backgroundColor: 'red',
            color: 'white',
            minWidth: '300px',
            maxWidth: '90%',
            textAlign: 'center',
            display: 'inline-block',
            fontSize: '1.5rem', // Increased font size (20px)
            borderRadius: '8px', // Added border radius
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Added shadow for depth
          }}
        >
          <i className="mdi mdi-close-octagon-outline me-2 fs-4"></i>
          <p className="">{alertMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Error;
