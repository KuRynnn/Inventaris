// components/Button.js
import React from 'react';

const Button = React.forwardRef(({ children, variant = 'secondary', size = 'medium', className = '', ...props }, ref) => {
  const baseStyle = "rounded font-semibold flex items-center justify-center";
  const variantStyles = {
    primary: "bg-blue-800 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    nav: "text-gray-800 hover:bg-gray-300",
    detail: "bg-yellow-500 text-white hover:bg-yellow-600",
    danger: "bg-red-400 text-white hover:bg-red-500",
  };
  const sizeStyles = {
    small: "py-1 px-2 text-sm",
    medium: "py-2 px-4",
    large: "py-3 px-6 text-lg",
  };

  return (
    <button 
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;