const SpinnerLoader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // semi-transparent grey
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span> {/* For older Bootstrap */}
        {/* <span className="visually-hidden">Loading...</span> */} {/* For Bootstrap 5 */}
      </div>
    </div>
  );
};

export default SpinnerLoader;
