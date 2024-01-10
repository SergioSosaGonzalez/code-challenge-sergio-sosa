import { Article } from '../interfaces/news';

const orderNewsByRow = (news: Article[]) => {
  let newsByRow: Article[][] = [];
  let count = 0;
  let auxArray: Article[] = [];
  news.forEach((newItem) => {
    count++;
    auxArray = [...auxArray, newItem];
    if (count === 3) {
      newsByRow = [...newsByRow, auxArray];
      auxArray = [];
      count = 0;
    }
  });

  if (auxArray.length) {
    newsByRow = [...newsByRow, auxArray];
  }

  return newsByRow;
};

export default orderNewsByRow;
