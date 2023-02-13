import { useSearchParams } from 'react-router-dom';
import { usePagination } from '../../../hooks/usePagination';
import styles from './Pagination.module.scss';

export const Pagination = ({ currentPage, total_pages }) => {
  let [, setSearchParams] = useSearchParams();
  const { listOfPages, start } = usePagination(currentPage, total_pages, 3);

  const onNextPage = (numberPage) => {
    setSearchParams({ page: numberPage });
  };

  return (
    <div className={styles.pagination_wrap}>
      {start > 0 && (
        <button onClick={() => onNextPage(currentPage - 1)} type="button" className={styles.pagination_btn}>Назад</button>
      )}

      <div className={styles.pagination_wrap_btn}>
        {listOfPages.map((i) => (
          <button
            key={i}
            className={currentPage === i
              ? `${styles.pagination_btn} ${styles.pagination_btn_active}`
              : styles.pagination_btn}
            onClick={() => onNextPage(i)}
            type="button"
          >
            <span>{i}</span>
          </button>
        ))}
      </div>

      <button disabled className={styles.pagination_btn}>{total_pages}</button>
    </div>
  );
};
