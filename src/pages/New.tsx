import { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Location, useNavigate, useLocation } from 'react-router-dom';
import ImageNotFound from '../assets/Image_not_available.png';
import { Article } from 'src/interfaces/news';

const New = () => {
  const { state }: Location<Article> = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!state) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!state) return null;
  return (
    <Container>
      <Row>
        <Col>
          <h1>{state?.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Image src={state.urlToImage || ImageNotFound} fluid />
        </Col>
      </Row>
      {state.author && (
        <Row>
          <Col className='text-start'>
            <span>Autor: {state.author}</span>
          </Col>
        </Row>
      )}
      <Row>
        <Col className='text-start'>
          <span>Fuente: {state.source.name}</span>
        </Col>
      </Row>
      <p className='fst-italic'>{state.description}</p>
      <p>{state.content}</p>
      <a href={state.url} className='url-component' target='_blank'>
        {state.url}
      </a>
    </Container>
  );
};
export default New;
