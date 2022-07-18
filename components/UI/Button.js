import React from 'react';
import Link from 'next/link';

const Button = ({ classes, children }) => {
	const buttonClasses = `py-2 px-4 flex items-center justify-center ${classes}`;

	return <button className={buttonClasses}>{children}</button>;
};

export default Button;
