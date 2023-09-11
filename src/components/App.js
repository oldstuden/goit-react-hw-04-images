import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from './Api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ErrorMsg } from './Loader/Loader.styled';
import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: false,
    loading: false,
    totalImages: 0,
  };
  async componentDidUpdate(prevProps, prevState) {
    const { query, page, totalImages, images } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ loading: true, error: false });
        const { hits, totalHits } = await fetchImages(query, page);

        if (totalHits === 0) {
          return;
        }

        this.setState(prevState => ({
          images: [
            ...prevState.images,
            ...hits.map(item => ({
              id: item.id,
              largeImageURL: item.largeImageURL,
              webformatURL: item.webformatURL,
              tags: item.tags,
            })),
          ],
          totalImages: totalHits,
        }));
      } catch (error) {
        this.setState({
          error: true,
        });
      } finally {
        this.setState({ loading: false });
      }
    }
    if (totalImages && totalImages === images.length) {
      toast.success('You have reached the end of the list of images found');
    }
  }

  handleSubmit = query => {
    this.setState({
      query: query,
      images: [],
      page: 1,
      error: false,
      totalImages: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, totalImages } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {images.length > 0 && <ImageGallery hits={images} />}
        {images.length === 0 && !loading && (
          <ErrorMsg>
            Such images was not found, try find something else
          </ErrorMsg>
        )}
        {images.length !== totalImages && !loading && (
          <Button loadMore={this.handleLoadMore} />
        )}
        <Toaster />

        <GlobalStyle />
      </div>
    );
  }
}
