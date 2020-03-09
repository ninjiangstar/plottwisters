import * as React from "react";

interface ILegendKey {
  shape: JSX.Element;
  text: string;
}

export const Legend = (props: React.SVGProps<SVGGElement>) => {
  const legendKeys: ILegendKey[] = [
    {
      shape: <circle cx={16} cy={16} r={8} />,
      text: "Experience or event that you made happen",
    },
    {
      shape: <circle cx={16} cy={16} r={8} />,
      text: "Experience or event that happened to you",
    },
    {
      shape: <circle cx={16} cy={16} r={8} />,
      text: "Potential future event",
    },
  ];

  function renderLegendKey(item: ILegendKey, i: number) {
    const transform = `translate(10, ${10 + i * 30})`;
    return (
      <g key={i} transform={transform}>
        {item.shape}
        <foreignObject x={0} y={0} width={200} height={30}>
          <div className="legend-key-text">{item.text}</div>
        </foreignObject>
      </g>
    );
  }

  return (
    <g {...props} className="cookie-trail-legend">
      <text x={0} y={30} className="title">
        Key
      </text>
      <g transform="translate(0, 40)">
        <rect width={200} height={200} className="box" />
        {legendKeys.map(renderLegendKey)}
      </g>
    </g>
  );
};
