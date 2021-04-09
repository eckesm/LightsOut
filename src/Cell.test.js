import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cell from './Cell';

test('it renders without crashing.', () => {
	render(<Cell />);
});
