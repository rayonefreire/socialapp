import React from 'react';

import {
  View,
  Text,
} from 'react-native';

import { styles } from './styles';
import { theme } from '../../styles/theme';

import { ButtonIcon } from '../ButtonIcon';
import { useNavigation } from '@react-navigation/native';

export function Header(){
  const navigation = useNavigation();

  function handleNavigateCreatePostScreen() {
    navigation.navigate('CreatePost')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Feed
      </Text>
      <ButtonIcon
        iconName='plus'
        color={theme.blue}
        size={32}
        onPress={handleNavigateCreatePostScreen}
      />
    </View>
  );
}