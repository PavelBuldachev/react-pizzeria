import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="94" y="124" rx="0" ry="0" width="1" height="0" /> 
    <circle cx="144" cy="139" r="120" /> 
    <rect x="0" y="306" rx="10" ry="10" width="280" height="85" /> 
    <rect x="0" y="405" rx="10" ry="10" width="89" height="27" /> 
    <rect x="125" y="406" rx="19" ry="19" width="155" height="27" /> 
    <rect x="0" y="265" rx="10" ry="10" width="280" height="27" />
  </ContentLoader>
)

export default Skeleton;