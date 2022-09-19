import Avatar, { Size } from '@moon-ui/avatar';

// Hooks
import { useNavigate } from 'react-router-dom';

import styles from './AppHeader.module.scss';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.left} onClick={() => navigate('/')}>
        DREAMER
      </div>
      <div className={styles.menu}></div>
      <Avatar
        size={Size.sm}
        className={styles.right}
        onClick={() => {
          navigate('/setting');
        }}
      />
    </div>
  );
};

export default Header;
