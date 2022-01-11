import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Game from './components/Game';
import axios from 'axios';

test('renders App component', () => {
  render(<App />);
});

test('renders title', () => {
  render(<App />);
  const title = screen.getByText(/Trivia Night/i);
  expect(title).toBeInTheDocument();
});

test('render Game', () => {
  render(<Game />);
  expect(screen.getAllByRole('article').length).toBe(1);
})


