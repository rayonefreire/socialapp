import React, { useState, useEffect } from 'react';

import {
  FlatList,
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';

import { styles } from './styles';
import { database } from '../../../config/firebase';

import { UserProps } from '../../context';
import { Divider } from '../../components/Divider';
import { User } from '../../components/User';
import { useNavigation } from '@react-navigation/native';

type Users = {
  id: string;
  data: UserProps;
}[];

export function Search(){
  const [text, setText] = useState(String);
  const [user, setUser] = useState<Users>([]);
  const navigation = useNavigation();

  function handleNavigateProfileScreen(idUser: string) {
    navigation.navigate('Profile', { idUser });
  }

  useEffect(() => {
    const collectionRef = collection(database, 'users');
    const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      }) as Users;
      const user = data.filter(user => user.data.username === text);
      setUser(user);
    });
    return unsubscribe;
  }, [text]);
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Pesquisar</Text>
          <TextInput
            placeholder='Usuário'
            onChangeText={setText}
            style={styles.input}
          />
        </View>
        <FlatList
          data={user}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleNavigateProfileScreen(item.id)}
            >
              <User
                avatarUrl={item.data.avatar_url}
                username={item.data.username}
              />
            </TouchableOpacity>
          }
          ItemSeparatorComponent={Divider}
        />
      </View>
    </SafeAreaView>
  );
}