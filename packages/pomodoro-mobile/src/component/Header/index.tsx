import IconBack from '@moon-ui/icon/IconBack';

import styles from './index.module.scss'

type Props = {
  onClickBackButton?: () => void
  children?: React.ReactNode
}

export default function Header({onClickBackButton, children}: Props) {
  return (
    <div className={styles.container}>
      <IconBack className={styles.icon} onClick={onClickBackButton} />
      {children}
    </div>
  )
}
