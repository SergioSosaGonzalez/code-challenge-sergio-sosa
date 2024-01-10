import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getNewsAPI } from '../services/getNews';
import { Article } from '../interfaces/news';
import { CardNews, SpinnerComponent } from '../components';
import orderNewsByRow from '../helpers/orderNewsByRow';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<Article[][]>([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getNewsAPI(i18n.language);
      const dataOrderByRow = orderNewsByRow(
        data.articles.filter(({ title }) => title !== '[Removed]')
      );
      setNews(dataOrderByRow);
      setLoading(false);
    };
    getData();
  }, [i18n.language]);

  if (loading)
    return (
      <div className='spinner-container'>
        <SpinnerComponent />
      </div>
    );

  return (
    <Container className='mt-5'>
      {news.map((newItems, i) => (
        <Row className='mt-3' key={i}>
          {newItems.map((newItem) => (
            <Col md='4' lg='4' key={newItem.title}>
              <CardNews {...newItem} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};
export default Main;
