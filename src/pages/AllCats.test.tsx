import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import AllCats from './AllCats';
vi.mock('../store/CatsStore', () => ({
  default: {
    cat: [
      { id: '1', url: 'https://WinTrainee/cat1.jpg' },
      { id: '2', url: 'https://WinTrainee/cat2.jpg' },
    ],
    isLoad: false,
    error: null,
    fetch: vi.fn(),
    favoriteCats: [],
    addToFavorites: vi.fn(),
    deleteFavorites: vi.fn(),
  },
}));
describe('AllCats', () => {
  it('должно отображать изображения котиков', () => {
    render(<AllCats />);
    const catImages = screen.getAllByAltText('кот');
    expect(catImages.length).toBe(2); 
    expect(catImages[0]).toHaveAttribute('src', 'https://WinTrainee/cat1.jpg');
    expect(catImages[1]).toHaveAttribute('src', 'https://WinTrainee/cat2.jpg'); 
  });
});
