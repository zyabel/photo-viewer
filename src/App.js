import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { fetchToken } from './store/auth';
import { fetchPhotos } from './store/photos';

import Pagination from '@material-ui/lab/Pagination';
import Modal from '@material-ui/core/Modal';

import './App.css';

function App() {
  const { isToken, photos } = useSelector((state) => ({
    isToken: state.auth.isToken,
    photos: state.photos
  }));
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if(!isToken) dispatch(fetchToken());
    if(isEmpty(photos) && isToken) dispatch(fetchPhotos());
  });

  const onPageChanged = (e, value) => {
    const { page, pageCount } = photos;
    setCurrentPage(value);
  console.log(value);
    // axios.get(`/api/countries?page=${currentPage}&limit=${pageLimit}`)
    //   .then(response => {
    //     const currentCountries = response.data.countries;
    //     setCurrentPage(page);
    //   });
  }

  return (
    <div className="App">
      {photos.pictures && photos.pictures.map(({ cropped_picture, id }) => (
        <img src={cropped_picture} key={id} />
      ))}
      <Pagination count={photos.pageCount && photos.pageCount} page={currentPage} onChange={onPageChanged}/>
    </div>
  );
}

export default App;
