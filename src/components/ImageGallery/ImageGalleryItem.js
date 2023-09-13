import { Component } from 'react';
import Modal from 'react-modal';
import { ImageGalleryItemImage, ImageItem } from './ImageGallery.styled';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <>
        <ImageItem className="gallery-item">
          <ImageGalleryItemImage
            src={webformatURL}
            alt={tags}
            onClick={this.openModal}
          />
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <img src={largeImageURL} alt={tags} width={600} height={400} />
          </Modal>
        </ImageItem>
      </>
    );
  }
}
