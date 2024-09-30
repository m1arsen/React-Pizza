import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="130" r="130" />
      <rect x="0" y="277" rx="10" ry="10" width="280" height="30" />
      <rect x="0" y="321" rx="10" ry="10" width="280" height="85" />
      <rect x="0" y="428" rx="10" ry="10" width="90" height="25" />
      <rect x="145" y="419" rx="23" ry="23" width="130" height="45" />
    </ContentLoader>
  );
};

export default Skeleton;
