import React, { useState, useEffect, useContext } from 'react';

import {
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';

import { styles } from './styles';
import { database } from '../../../config/firebase';

import { Context, UserProps } from '../../context';
import { PropsPosts } from '../../screens/Home';

type Props = {
  idUser: string;
  idPost?: string;
  description: string;
}

export function Activitie({ idUser, idPost, description } : Props){
  const [userActivitie, setUserActivitie] = useState<UserProps>();
  const [postsUser, setPostsUser] = useState<PropsPosts>([]);
  const navigation = useNavigation();
  const { userId } = useContext(Context);

  function handleNavigateRouteDescription() {
    if (description === ' curtiu sua publicação') {
      navigation.navigate('ViewPost', { posts: postsUser, idPost });
    } else if (description === ' comentou na sua publicação') {
      navigation.navigate('Comments', { idPost });
    } else if (description === ' começou a te seguir') {
      navigation.navigate('Profile', { idUser });
    }
  }

  // Pegando os dados do usuário que fez a atividade
  useEffect(() => {
    const docRef = doc(database, 'users', idUser);
    const unsubiscribe = onSnapshot(docRef, querySnapshot => {
      const data = querySnapshot.data() as UserProps;
      setUserActivitie(data);
    });
    return unsubiscribe;
  }, []);

  useEffect(() => {
    const collectionRef = collection(database, 'posts');
    const unsubiscribe = onSnapshot(query(collectionRef, orderBy('timestamp', 'asc')), querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data(),
        }
      }) as PropsPosts;
      const posts = data.filter(post => post.data.id_user === userId);
      setPostsUser(posts);
    });
    return unsubiscribe;
  })

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleNavigateRouteDescription}
      style={styles.container}
    >
      <Image
        source={{ uri: userActivitie?.avatar_url }}
        style={styles.avatarUrl}
      />
      <Text style={styles.text}>{ userActivitie?.username }{ description }</Text>
    </TouchableOpacity>
  );
}