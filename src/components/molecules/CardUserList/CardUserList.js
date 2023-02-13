import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CardUserList.module.scss';
import { Heart } from '../../atoms/icons/Heart';
import { fetchPutUserItem } from '../../../store/slice/userSlice';
import { useDispatch } from 'react-redux';


export const CardUserList = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [like, setLike] = useState(user.like);

  const onSetLike = (e) => {
    e.stopPropagation();
    setLike(!like);
    const savedLiked = localStorage.getItem('listLiked');
    if (savedLiked) {
      const isSaved = JSON.parse(savedLiked);
      const index = isSaved.indexOf(user.id);
      if (~index) {
        isSaved.splice(index, 1);
      } else {
        isSaved.push(user.id);
      }
      localStorage.setItem('listLiked', JSON.stringify(isSaved));
    } else {
      localStorage.setItem('listLiked', JSON.stringify([user.id]));
    }
    dispatch(fetchPutUserItem({ ...user, like: !like }));
  };

  const onGoToCard = () => {
    navigate(`/user/${user.id}`);
  };

  return (
    <li className={styles.card} onClick={onGoToCard}>

      <img
        className={styles.card_img}
        src={user.avatar}
        alt={`Аватар ${user.first_name} ${user.last_name}`}
      />

      <h3 className={styles.card_name}>
        {`${user.first_name} ${user.last_name}`}
      </h3>

      <div className={styles.card_btn_wrap}>
        <button onClick={onSetLike} className={styles.card_btn}>
          <Heart active={like} />
        </button>
      </div>

    </li>
  );
};
