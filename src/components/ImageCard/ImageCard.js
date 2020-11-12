import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";

import './ImageCard.css';

const ImageCard = ({data}) => {
  const {full_picture, author, camera, cropped_picture, tags} = data;
  console.log(author);
  return (
    <Card className="image-modal" >
      <TransformWrapper>
        <TransformComponent>
          <div className="card-media-container">
            <img src={full_picture} className="card-media" alt="test" />            
          </div>
        </TransformComponent>
      </TransformWrapper>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {camera}
        </Typography>
      </CardContent>
      <CardContent>
        <FacebookShareButton url={cropped_picture} hashtag={tags} >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={cropped_picture} hashtag={tags}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </CardContent>
    </Card>
  );
};

ImageCard.propTypes = {
  full_picture: PropTypes.string,
  author: PropTypes.string,
  camera: PropTypes.string,
  cropped_picture: PropTypes.string,
  tags: PropTypes.string
};

export default ImageCard;