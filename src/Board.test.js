import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './Board';

test('it renders without crashing.', () => {
	render(<Board />);
});
