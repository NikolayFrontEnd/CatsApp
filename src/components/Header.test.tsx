import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import Header from './Header';
describe('Header', () => {
    it('должно отображать "Все котики" и "Любимые котики"', () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const allCatsLink = screen.getByText('Все котики');
      expect(allCatsLink).toBeInTheDocument();
      const favouriteCatsLink = screen.getByText('Любимые котики');
      expect(favouriteCatsLink).toBeInTheDocument();
    });
  });
  