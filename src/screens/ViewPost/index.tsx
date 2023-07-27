import React from 'react';

import {
  View,
  SafeAreaView
} from 'react-native';

import { styles } from './styles';
import { PostsList } from '../../components/PostsList';
import { PropsPosts } from '../Home';
import { useRoute } from '@react-navigation/native';

type Params = {
  posts: PropsPosts;
  idPost: string;
}

export function ViewPost(){
  const route = useRoute();
  const { posts, idPost } = route.params as Params;
  
  const indexPost = posts.findIndex(post => post.id === idPost);

  return (
    <SafeAreaView style={styles.container}>
      <PostsList
        posts={posts}
        index={indexPost}
      />
    </SafeAreaView>
  );
}