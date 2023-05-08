import styles from './style.module.scss';

export default function IconBorderInner(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#00000075"
      className={styles.icon}
      {...props}
    >
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7 3H9V5H7V3ZM3 7H5V9H3V7ZM3 19V21H5V19H3ZM7 21H9V19H7V21ZM3 15V17H5V15H3ZM5 3H3V5H5V3ZM15 3H17V5H15V3ZM19 9H21V7H19V9ZM19 5V3H21V5H19ZM15 21H17V19H15V21ZM11 4C11 3.45001 11.45 3 12 3C12.55 3 13 3.45001 13 4V11H20C20.55 11 21 11.45 21 12C21 12.55 20.55 13 20 13H13V20C13 20.55 12.55 21 12 21C11.45 21 11 20.55 11 20V13H4C3.45001 13 3 12.55 3 12C3 11.45 3.45001 11 4 11H11V4ZM21 15V17H19V15H21ZM19 21H21V19H19V21Z"
        />
      </g>
    </svg>
  );
}
