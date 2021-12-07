const pxForSpacerSize: Record<string, number> = {
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 22,
};

interface spacerOwnProps {
  size: string;
}

const Spacer = (props: spacerOwnProps) => {
  const { size } = props;

  return <div style={{ height: `${pxForSpacerSize[size]}px` }} />;
};

export default Spacer;
