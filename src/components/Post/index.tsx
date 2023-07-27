import React, { useEffect, useState, useContext } from 'react';

import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { database } from '../../../config/firebase';

import { ButtonIcon } from '../ButtonIcon';
import { Context, UserProps } from '../../context';
import { User } from '../User';

type Props = {
  idUser: string;
  url: string;
  typeMidia: string;
  description: string;
  idPost: string;
}

export function Post({
  idUser,
  url,
  typeMidia,
  description,
  idPost,
} : Props){
  const [userPost, setUserPost] = useState<UserProps>();
  const [likes, setLikes] = useState<string[]>([]);

  const { userId } = useContext(Context);
  const navigation = useNavigation();

  function handleNavigateCommentsScreen() {
    navigation.navigate('Comments', { idPost, idUser });
  }

  function handleNavigateProfileScreen() {
    navigation.navigate('Profile', { idUser });
  }

  // Função para o usuário dar like no post
  function handleLikePost() {
    const docRef = doc(database, 'posts', idPost, 'likes', userId);
    if (likes.includes(userId)) {
      deleteDoc(docRef);
    } else {
      setDoc(docRef, {
        id_user: userId,
      });
      if (idUser !== userId) {
        addDoc(collection(database, 'users', idUser, 'activities'), {
          id_user: userId,
          id_post: idPost,
          description: ' curtiu sua publicação',
          timestamp: new Date(),
        })
      }
    }
  }

  // Pegando todas as curtidas do post
  useEffect(() => {
    const collectionRef = collection(database, 'posts', idPost, 'likes');
    const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return doc.id;
      });
      setLikes(data);
    });
    return unsubscribe;
  }, []);

  // Pegando dados do usuário que fez o post
  useEffect(() => {
    const docRef = doc(database, 'users', idUser);
    const unsubiscribe = onSnapshot(docRef, querySnapshot => {
      const data = querySnapshot.data() as UserProps;
      setUserPost(data);
    });
    return unsubiscribe;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.user}
        onPress={handleNavigateProfileScreen}
      >
        <User
          avatarUrl={userPost?.avatar_url}
          username={userPost?.username}
        />
      </TouchableOpacity>

      <View style={styles.post}>
        {typeMidia === 'image' ?
          <Image
            source={{ uri: url }}
            style={styles.midia}
            resizeMode='cover'
          /> :
          <Video
            style={styles.midia}
            source={{
              uri: url,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        }
        <Text style={styles.description}>
          { description }
        </Text>
        <Text style={styles.likes}>
          { likes.length } curtidas
        </Text>
      </View>

      <View style={styles.footer}>
        <ButtonIcon
          iconName={likes.includes(userId) ? 'heart' : 'heart-outline'}
          size={32}
          color={likes.includes(userId) ? 'red' : 'black'}
          onPress={handleLikePost}
        />
        <ButtonIcon
          iconName='chat-outline'
          size={32}
          onPress={handleNavigateCommentsScreen}
        />
      </View>
    </View>
  );
}