export const DEFlag: React.FC<React.SVGAttributes<{}>> = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      className="h-full"
    >
      <path fill="#ffce00" d="M0 320h640v160H0z" />
      <path d="M0 0h640v160H0z" />
      <path fill="#d00" d="M0 160h640v160H0z" />
    </svg>
  );
};
