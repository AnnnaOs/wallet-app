import Icons from '../../images/icons.svg';

const Icon = ({ className, width, height, name }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`${Icons}#${name}`} />
    </svg>
  );
};

export default Icon;
