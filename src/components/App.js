import { fetchImages } from './Api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ErrorMsg } from './Loader/Loader.styled';
import { GlobalStyle } from './GlobalStyle';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!query) return;

    async function getImages() {
      try {
        setError(false);
        setLoading(true);
        const { hits, totalHits } = await fetchImages(query, page);

        if (totalHits === 0) {
          return;
        }

        setImages(prevImages => [
          ...prevImages,
          ...hits.map(item => ({
            id: item.id,
            largeImageURL: item.largeImageURL,
            webformatURL: item.webformatURL,
            tags: item.tags,
          })),
        ]);
        setTotalImages(totalHits);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  useEffect(() => {
    if (!error) return;
    alert('something went wrong');
  }, [error]);

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setError(false);
    setTotalImages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {images.length > 0 && <ImageGallery hits={images} />}
      {images.length === 0 && !loading && (
        <ErrorMsg>Such images was not found, try find something else</ErrorMsg>
      )}
      {images.length !== totalImages && !loading && (
        <Button loadMore={handleLoadMore} />
      )}
      <GlobalStyle />
    </div>
  );
};
