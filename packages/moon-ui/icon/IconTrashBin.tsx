export default function IconTrashBin(
  props: React.HTMLAttributes<SVGSVGElement>
) {
  return (
    <svg
      width="24" 
      height="24"
      className="ionicon"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        d="M432 144l-28.67 275.74A32 32 0 01371.55 448H140.46a32 32 0 01-31.78-28.26L80 144"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <rect
        x="32"
        y="64"
        width="448"
        height="80"
        rx="16"
        ry="16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M312 240L200 352M312 352L200 240"
      />
    </svg>
  );
}
