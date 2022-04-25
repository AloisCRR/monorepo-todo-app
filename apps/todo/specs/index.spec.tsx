import { render } from '@testing-library/react';
import React from 'react';
import IndexTest from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IndexTest />);
    expect(baseElement).toBeTruthy();
  });
});
