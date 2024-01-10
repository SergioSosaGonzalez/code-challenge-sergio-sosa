import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { Article } from '../interfaces/news';
import ImageNotFound from '../assets/Image_not_available.png';
import { useTranslation } from 'react-i18next';
import './CardNews.css';

interface CardNewsProps extends Article {}

const CardNews: React.FC<CardNewsProps> = (props) => {
  const { urlToImage, title, description } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const checkNewHandle = () => {
    navigate('new', { state: props });
  };
  return (
    <Card className='news_card'>
      <Card.Img
        className='news_card__img'
        variant='top'
        src={urlToImage || ImageNotFound}
      />
      <Card.Body>
        <Card.Title className='news_card__title'>{title}</Card.Title>
        <Card.Text className='news_card__description'>{description}</Card.Text>
        <Button variant='primary' onClick={checkNewHandle}>
          {t('news.card_button')}
        </Button>
      </Card.Body>
    </Card>
  );
};
export default CardNews;
