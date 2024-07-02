// components/StatCard.js
import React from 'react';

const StatCard = ({ number, title, subtitle, bgColor, textColor }) => (
  <div className={`${bgColor} p-4 rounded flex-1`}>
    <h3 className={`text-3xl font-bold ${textColor}`}>{number}</h3>
    <p className={`${textColor}`}>{title}</p>
    <p className="text-sm text-gray-500">{subtitle}</p>
  </div>
);

export default StatCard;