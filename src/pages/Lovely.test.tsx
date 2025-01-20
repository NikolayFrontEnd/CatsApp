import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest'; 
import Lovely from './Lovely';
vi.mock('../store/CatsStore', () => ({
  default: {
    favoriteCats: [
      { id: '1', url: 'https://ex.com/cat1.jpg' },
      { id: '2', url: 'https://ex.com/cat2.jpg' },
    ],
    deleteFavorites: vi.fn(),
  },
}));

describe('Lovely', () => {
  it('должно отображать изображения любимых котиков', () => {
    render(<Lovely />);
    const favoriteCatImages = screen.getAllByAltText('Cat');
    expect(favoriteCatImages.length).toBe(2);
    expect(favoriteCatImages[0]).toHaveAttribute('src', 'https://ex.com/cat1.jpg'); 
    expect(favoriteCatImages[1]).toHaveAttribute('src', 'https://ex.com/cat2.jpg'); 
  });
  
});
