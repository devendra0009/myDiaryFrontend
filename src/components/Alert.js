import React from 'react';

const Alert = ({ alert }) => {
  const capitalize = (word) => {
    if (word === 'danger') word = 'Error';
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: '50px' }}>
      {
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.type!=="" && (
            <>
              <strong>{capitalize(alert.type)}</strong>: {alert.message}
            </>
          )}
        </div>
      }
    </div>
  );
};

export default Alert;
