import { render } from '@testing-library/react';

import ToDoCard from './to-do-card';

describe('ToDoCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ToDoCard />);
    expect(baseElement).toBeTruthy();
  });
});
