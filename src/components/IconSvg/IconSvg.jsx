import Icons from '../../images/icons.svg';

const IconSvg = ({ className, width, height, name }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`${Icons}#${name}`}></use>
    </svg>
  );
};

export default IconSvg;
