import React from 'react';

import {
  FlatList,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { PropsPosts } from '../../screens/Home';

type Props = {
  posts: PropsPosts;
}

export function PostsProfile({ posts } : Props){
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  function handleNavigateViewPostScreen(idPost: string) {
    navigation.navigate('ViewPost', { posts, idPost });
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      numColumns={3}
      renderItem={({ item }) => 
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleNavigateViewPostScreen(item.id)}
        >
          {item.data.type_midia === 'image' ?
            <Image
              source={{ uri: item.data.url }}
              style={[styles.midia, { width: width / 3 }]}
              resizeMode='cover'
            /> :
            <Video
              style={[styles.midia, { width: width / 3 }]}
              source={{
                uri: item.data.url,
              }}
              useNativeControls={false}
              resizeMode={ResizeMode.COVER}
              isLooping
              shouldPlay
              volume={0}
            />
          }
        </TouchableOpacity>
      }
    />
  );
}