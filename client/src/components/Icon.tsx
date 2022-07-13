import Style from './Icon.module.css';

type Props = {
  name?: string,
  rotate?: boolean,
};

const Icon = (props: Props) => {
  if (!props.name) return (
    <></>
  );

  return (
    <img src={`/icons/${props.name}.png`} alt={props.name} className={props.rotate ? Style.rotate : Style.icon} />
  );
}
export default Icon;

