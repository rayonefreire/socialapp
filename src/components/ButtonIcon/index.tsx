import React from 'react';

import {
  TouchableOpacity,
  TouchableOpacityProps,
  ColorValue
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
  iconName: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color?: ColorValue;
  size?: number;
}

export function ButtonIcon({
  iconName,
  color,
  size = 28, 
  ...rest
} : Props){
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...rest}
    >
      <MaterialCommunityIcons name={iconName} color={color} size={size} />
    </TouchableOpacity>
  );
}