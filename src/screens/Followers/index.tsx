import React, { useEffect, useState } from 'react';

import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { User } from '../../components/User';
import { UserProps } from '../../context';
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from '../../../config/firebase';

type Follower = {
  id: string;
  data: UserProps;
};

type Params = {
  followers: string[];
}

export function Followers(){
  const [users, setUsers] = useState<Follower[]>([]);
  const route = useRoute();
  const { followers } = route.params as Params;
  const navigation = useNavigation();

  //////////////////////////////////
  function handleNavigateProfileFollowerScreen(idUser: string) {
    navigation.navigate("Profile", { idUser });
  }

  useEffect(() => {
    followers.map(follower => {
      const docRef = doc(database, 'users', follower);
      const unsubscribe = onSnapshot(docRef, querySnapshot => {
        const data = {
          id: querySnapshot.id,
          data: querySnapshot.data(),
        } as Follower;
        setUsers([...users, data]);
      });
      return unsubscribe;
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleNavigateProfileFollowerScreen(item.id)}
            >
              <User
                avatarUrl={item.data.avatar_url}
                username={item.data.username}
              />
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
}