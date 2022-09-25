import React from 'react'

import Typography from '@moon-ui/typography'

import cx from 'classnames'

import styles from './index.module.scss'

type Props = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  active: boolean
}

export default function Button3D({ active, className, children, ...restProps }: Props) {
  return (
        <button
          className={cx(
            styles.button,
            active && styles.activeButton,
            className
          )}
          {...restProps}
        >
          <Typography.Text
            className={cx(
              styles.buttonText,
              active && styles.activeButtonText
            )}
          >
            {children}
          </Typography.Text>
        </button>
  )
}
