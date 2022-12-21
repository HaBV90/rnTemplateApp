import colors from './colors';
import fontWeights from './fontWeights';

type FontSize =
  | 130
  | 60
  | 56
  | 48
  | 40
  | 35
  | 28
  | 25
  | 22
  | 21
  | 20
  | 18
  | 17
  | 16
  | 14
  | 13
  | 12
  | 11
  | 10
  | 9
  | 8;
type FontWeight = 'normal' | 'bold' | 'extraBold';
type LineHeight = 1 | 1.25 | 1.5 | 1.75;

type TypographyProp = {
  fontSize: FontSize;
  fontWeight?: FontWeight;
  fontFamily?: 'HighwayGothicWide';
  lineHeight?: LineHeight;
  color?: string;
};

const typography = ({
  fontSize,
  fontWeight,
  fontFamily,
  lineHeight,
  color,
}: TypographyProp) => {
  return {
    color: color || colors.base90,
    fontSize,
    fontWeight: fontWeight ? fontWeights[fontWeight] : undefined,
    fontFamily,
    lineHeight: lineHeight ? Math.round(fontSize * lineHeight) : undefined,
  };
};

export default typography;
