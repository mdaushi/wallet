import { StyleProp, ViewStyle } from 'react-native';
import { TonThemeColor } from '$styled';
import React from 'react';

type HighlightBackground = TonThemeColor;

type ChildFn = (isHighlighted: boolean) => React.ReactNode;

export interface HighlightProps {
  onPress?: () => void;
  background?: HighlightBackground;
  highlightColor?: string;
  style?: StyleProp<ViewStyle>;
  contentViewStyle?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
  children?: React.ReactNode | ChildFn;
  onPressIn?: () => void;
  onPressOut?: () => void;
}
