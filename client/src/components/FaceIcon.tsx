import Style from './FaceIcon.module.css';

export default function FaceIcon(props: any) {
  const rows = [];

  const width: number = props.width / 16;
  const icon = props.icon;
  while (icon.length) {
    rows.push(icon.splice(0,16));
  }

  console.log(rows);

  return (
    <table className={Style.table}>
      {
        rows.map(row => (
          <tr>
            {
              row.map((px: any) => (
                <td style={{
                  width,
                  height: width,
                  background: `rgb(${px.r || 0},${px.g || 0},${px.b || 0})`,
                }} />
              ))
            }
          </tr>
        ))
      }
    </table>
  );
}
