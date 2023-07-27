import React from 'react';

import {
  Image,
  Text,
  View
} from 'react-native';

import { styles } from './styles';

type Props = {
  username: string | undefined;
  avatarUrl: string | undefined;
}

export function User({ username, avatarUrl } : Props){
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatarUrl }}
        style={styles.avatarUrl}
      />

      <Text style={styles.username}>{username}</Text>
    </View>
  );
}