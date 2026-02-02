import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.body;

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>

        {movie.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title || 'Movie poster'}
            className={css.image}
          />
        ) : (
          <div className={css.placeholder}>No image available</div>
        )}

        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview || 'No description available.'}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date || 'N/A'}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average ?? 'N/A'}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default MovieModal;