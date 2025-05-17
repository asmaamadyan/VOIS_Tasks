import { render, screen } from '@testing-library/react';
import App from './App';

// At the top of App.test.js or any test file that uses App.js
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  createBrowserRouter: jest.fn(),
  RouterProvider: ({ children }) => children
}));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
