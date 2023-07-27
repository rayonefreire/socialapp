import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  Image,
} from 'react-native';

import { styles } from './styles';

import { UserProps } from '../../context';
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from '../../../config/firebase';

type Props = {
  idUser: string;
  comment: string;
}

export function Comment({ idUser, comment } : Props){
  const [userComment, setUserComment] = useState<UserProps>();

  // Pegando os dados do usuário que fez o comentário
  useEffect(() => {
    const docRef = doc(database, 'users', idUser);
    const unsubiscribe = onSnapshot(docRef, querySnapshot => {
      const data = querySnapshot.data() as UserProps;
      setUserComment(data);
    });
    return unsubiscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userComment?.avatar_url }}
        style={styles.avatarUrl}
      />

      <View>
        <Text style={styles.username}>
          {userComment?.username}
        </Text>
        <Text style={styles.comment}>
          {comment}
        </Text>
      </View>
    </View>
  );
}