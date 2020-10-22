import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, get } from 'lodash';

import { fetchToken, shouldFetchToken } from './store/auth';
import { fetchPhotos, fetchSinglePhoto, shouldFetchPhotos } from './store/photos';

import Pagination from '@material-ui/lab/Pagination';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageCard from './components/ImageCard/ImageCard';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';

import './App.css';

function App() {
  const { 
    isToken, 
    photos, 
    image,
    isLoad
  } = useSelector((state) => ({
    isToken: state.auth.isToken,
    photos: get(state, 'photos.list', []),
    image: get(state, 'photos.singlePhoto', ''),
    isLoad: get(state, 'isLoading', false)
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!isToken) dispatch(fetchToken());
    if(isEmpty(photos) && isToken) dispatch(fetchPhotos());
  });

  const onPageChanged = (e, value) => {
    setCurrentPage(value);
    dispatch(fetchPhotos(value));
  }

  const openModal = (id) => {
    dispatch(fetchSinglePhoto(id));
    setTimeout(() => {
      setIsOpen(true);
    }, 500);
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const Card = React.forwardRef((props, ref) => <ImageCard {...props} forwardedRef={ref} />);

  return (
    <div className="App">
      {!isLoad
        ? <div className="app-wrapper">
          <div className="image-container">
            {photos.pictures && photos.pictures.map(({ cropped_picture, id }) => (
              <figcaption className="image-wrapper"  key={id}>
                <img className="image-preview" src={cropped_picture} onClick={() => openModal(id)}/>
              </figcaption>          
            ))}
          </div>

          <Pagination count={photos.pageCount && photos.pageCount} page={currentPage} onChange={onPageChanged} className="pagination"/>
          <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >          
            <Fade in={isOpen}>
              <Card data={image}/>
            </Fade>  
          </Modal>
        </div>
        : <div className="preloader-wrapper"><CircularProgress /></div>
      }
    </div>
  );
}

export default App;
