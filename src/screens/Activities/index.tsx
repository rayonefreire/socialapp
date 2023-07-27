import React, { useState, useEffect, useContext } from 'react';

import {
  FlatList,
  SafeAreaView,
  View
} from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

import { styles } from './styles';
import { database } from '../../../config/firebase';

import { Context } from '../../context';
import { Activitie } from '../../components/Activitie';

type Activitie = {
  id_user: string;
  id_post: string;
  description: string;
}

type PropsActivities = {
  id: string;
  data: Activitie;
}[];

export function Activities(){
  const [activities, setActivities] = useState<PropsActivities>([]);

  const { userId } = useContext(Context);

  // Pegando as atividades que o usuário recebeu
  useEffect(() => {
    const collectionRef = collection(database, 'users', userId, 'activities');
    const unsubscribe = onSnapshot(query(collectionRef, orderBy('timestamp', 'asc')), querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      }) as PropsActivities;
      setActivities(data);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={activities}
          keyExtractor={item => item.id}
          renderItem={({ item }) => 
            <Activitie
              idUser={item.data.id_user}
              idPost={item.data.id_post}
              description={item.data.description}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}