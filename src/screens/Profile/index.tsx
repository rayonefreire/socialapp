import React, { useState, useEffect, useContext } from 'react';

import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';

import { styles } from './styles';
import { database } from '../../../config/firebase';

import { Context, UserProps } from '../../context';
import { PropsPosts } from '../Home';
import { PostsProfile } from '../../components/PostsProfile';

type Params = {
  idUser: string;
}

export function Profile(){
  const [user, setUser] = useState<UserProps>();
  const [postsUser, setPostsUser] = useState<PropsPosts>([]);
  const [followersUser, setFollowersUser] = useState<string[]>([]);
  const [followingUser, setFollowingUser] = useState<string[]>([]);

  const { userId } = useContext(Context);
  const route = useRoute();
  const { idUser } = route.params as Params;
  const navigation = useNavigation();

  function handleNavigateFollowersScreen(followers: string[]) {
    navigation.navigate('Followers', { followers });
  }

  // Função para seguir o usuário
  function handleFollowUser() {
    const docRefFollow = doc(database, 'users', idUser, 'follows', userId);
    const docRefFollowing = doc(database, 'users', userId, 'following', idUser);
    if (followersUser.includes(userId)) {
      deleteDoc(docRefFollow);
      deleteDoc(docRefFollowing)
    } else {
      setDoc(docRefFollow, {
        id_user: userId,
      });
      setDoc(docRefFollowing, {
        id_user: idUser,
      });
    }
    addDoc(collection(database, 'users', idUser, 'activities'), {
      id_user: userId,
      description: ' começou a te seguir',
      timestamp: new Date(),
    })
  }

  // Pegando os dados do usuário
  useEffect(() => {
    const docRef = doc(database, 'users', idUser);
    const unsubscribe = onSnapshot(docRef, querySnapshot => {
      const data = querySnapshot.data() as UserProps;
      setUser(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const docRef = collection(database, 'users', idUser, 'follows');
    const unsubscribe = onSnapshot(docRef, querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return doc.id;
      });
      setFollowersUser(data);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const docRef = collection(database, 'users', idUser, 'following');
    const unsubscribe = onSnapshot(docRef, querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return doc.id;
      });
      setFollowingUser(data);
    });
    return unsubscribe;
  }, []);

  // Pegando os posts do usuário
  useEffect(() => {
    const collectionRef = collection(database, 'posts');
    const unsubscribe = onSnapshot(query(collectionRef, orderBy('timestamp', 'asc')), querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data(),
        }
      }) as PropsPosts;
      const posts = data.filter(post => post.data.id_user === idUser);
      setPostsUser(posts);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.user}>
          <Image
            source={{
              uri: user?.avatar_url 
            }}
            style={styles.avatarUrl}
          />
          <View>
            <Text style={styles.username}>
              { user?.username }
            </Text>
            <View style={styles.content}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleNavigateFollowersScreen(followersUser)}
              >
                <Text style={styles.info}>
                  Seguidores: {followersUser.length}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleNavigateFollowersScreen(followingUser)}
              >
                <Text style={styles.info}>
                  Seguindo: {followingUser.length}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {idUser !== userId &&
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.followButton}
            onPress={handleFollowUser}
          >
            <Text style={styles.titleButton}>
              {followersUser.includes(userId) ? 'Deixar de seguir' : 'Seguir'}
            </Text>
          </TouchableOpacity>
        }
        
        <PostsProfile
          posts={postsUser}
        />
      </View>
    </SafeAreaView>
  );
}