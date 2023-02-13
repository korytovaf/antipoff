import { Header } from '../../molecules/Header/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGetUserItem } from '../../../store/slice/userSlice';
import styles from './UserPage.module.scss';
import { Mail } from '../../atoms/icons/Mail';
import { Phone } from '../../atoms/icons/Phone';


export const UserPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  useEffect(() => {
    dispatch(fetchGetUserItem(params.id));
  }, [dispatch, params.id]);


  return (
    <div>
      <Header>
        <div className={styles.user_head_container}>
          <img
            className={styles.user_avatar}
            src={user?.avatar}
            alt={`Аватар ${user?.first_name} ${user?.last_name}`}
          />
          <div>
            <div className={styles.user_name}>{`${user?.first_name} ${user?.last_name}`}</div>
            <div className={styles.user_staff}>Партнер</div>
          </div>
        </div>
      </Header>

      <div className={styles.user_container}>
        <div className={styles.user_content}>
          <p>
            Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов,
            включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты.
            Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения
            новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
          </p>
          <p>
            В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями.
            Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того,
            что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том,
            что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
          </p>
          <p>
            Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую
            деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей
            инновационный подход к красоте, а также инвестором других бизнес-проектов.
          </p>
        </div>
        <div className={styles.user_contacts}>
          <a className={styles.user_contacts_link} href="tel:+79543334455">
            <Phone />
            +7 (954) 333-44-55
          </a>
          <a className={styles.user_contacts_link} href={`mailto:${user?.email}`}>
            <Mail />
            {user?.email}
          </a>
        </div>
      </div>
    </div>
  );
};
