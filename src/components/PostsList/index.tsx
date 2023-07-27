import React from 'react';

import {
  FlatList,
} from 'react-native';

import { Post } from '../Post';
import { PropsPosts } from '../../screens/Home';
import { Divider } from '../Divider';

type Props = {
  posts: PropsPosts;
  index?: number;
}

export function PostsList({ posts, index } : Props){
  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      initialScrollIndex={index}
      renderItem={({ item }) => 
        <Post
          idUser={item.data.id_user}
          url={item.data.url}
          typeMidia={item.data.type_midia}
          description={item.data.description}
          idPost={item.id}
        />
      }
      ItemSeparatorComponent={() => 
        <Divider />
      }
    />
  );
}