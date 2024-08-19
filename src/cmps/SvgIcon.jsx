import { svgService } from "../services/svg.service";

const svgIcon = ({ iconName }) => {
  const svg = svgService.getSvg(iconName);
  return <i dangerouslySetInnerHTML={{ __html: svg }}></i>;
};

export default svgIcon;
