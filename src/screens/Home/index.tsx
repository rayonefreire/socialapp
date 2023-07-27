import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
} from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { styles } from './styles';
import { database } from '../../../config/firebase';

import { Header } from '../../components/Header';
import { PostsList } from '../../components/PostsList';

type Post = {
  id_user: string;
  url: string;
  type_midia: string;
  description: string;
  timestamp: Date;
}

export type PropsPosts = {
  id: string;
  data: Post;
}[];

export function Home(){
  const [posts, setPosts] = useState<PropsPosts>([]);

  useEffect(() => {
    const collectionRef = collection(database, 'posts');
    const unsubscribe = onSnapshot(query(collectionRef, orderBy('timestamp', 'asc')), querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data(),
        }
      }) as PropsPosts;
      setPosts(data);
    });
    return unsubscribe;
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header />

        <PostsList
          posts={posts}
        />
      </View>
    </SafeAreaView>
  );
}