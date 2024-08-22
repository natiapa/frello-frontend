import { svgService } from "../services/svg.service";

const SvgIcon = ({ iconName }) => {
  const svg = svgService.getSvg(iconName);
  return <i dangerouslySetInnerHTML={{ __html: svg }}></i>;
};

export default SvgIcon;
