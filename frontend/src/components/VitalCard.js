import React from 'react';

function VitalCard({ label, value, unit, color, status }) {
  return React.createElement(
    'div',
    { className: 'vital-card vital-card--' + status, style: { '--card-color': color } },
    React.createElement(
      'div',
      { className: 'vital-card__body' },
      React.createElement('span', { className: 'vital-card__label' }, label),
      React.createElement(
        'div',
        { className: 'vital-card__value' },
        React.createElement('span', { style: { color } }, value),
        React.createElement('span', { className: 'vital-card__unit' }, unit)
      )
    )
  );
}

export default VitalCard;
