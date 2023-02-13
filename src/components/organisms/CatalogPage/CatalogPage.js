import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUsers } from '../../../store/slice/userSlice';
import { CardUserList } from '../../molecules/CardUserList/CardUserList';
import styles from './CatalogPage.module.scss';
import { Header } from '../../molecules/Header/Header';
import { Pagination } from '../../molecules/Pacination/Pagination';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { useSearchParams } from 'react-router-dom';


const PER_PAGE = 3;

export const CatalogPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { users, total_pages, currentPage, status } = useSelector(store => store.user);

  useEffect(() => {
    dispatch(fetchGetUsers({
      query: {
        per_page: PER_PAGE,
        page: searchParams.get('page'),
      },
    }));
  }, [currentPage, dispatch, searchParams]);


  return (
    <div>
      <Header>
        <div className={styles.header_content}>
          <h1 className={styles.header_content_title}>
            Наша команда
          </h1>
          <p className={styles.header_content_text}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи,
            и умеющие находить выход из любых, даже самых сложных ситуаций.
          </p>
        </div>
      </Header>

      {status === 'loading' ? (
        <Spinner />
      ) : (
        <div className={styles.catalog_container}>
          <ul className={styles.catalog}>
            {users.map(user => (
              <CardUserList key={user.id} user={user} />
            ))}
          </ul>
          <Pagination currentPage={currentPage} total_pages={total_pages} />
        </div>
      )}

    </div>
  );
};
