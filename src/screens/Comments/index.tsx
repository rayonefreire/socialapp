import React, { useState, useEffect, useContext } from 'react';

import {
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  FlatList
} from 'react-native';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';

import { styles } from './styles';
import { database } from '../../../config/firebase';
import { theme } from '../../styles/theme';

import { ButtonIcon } from '../../components/ButtonIcon';
import { Context } from '../../context';
import { Comment } from '../../components/Comment';
import { Divider } from '../../components/Divider';

type Comment = {
  id_user: string;
  comment: string;
}

type PropsComments = {
  id: string;
  data: Comment;
}[];

type Params = {
  idPost: string;
  idUser: string;
}

export function Comments(){
  const [text, setText] = useState(String);
  const [comments, setComments] = useState<PropsComments>([]);
  const route = useRoute();
  const { idPost, idUser } = route.params as Params;
  const { userId } = useContext(Context);

  // Função para o usuário comentar no post
  function handleAddCommentPost() {
    addDoc(collection(database, 'posts', idPost, 'comments'), {
      id_user: userId,
      comment: text,
      timestamp: new Date(),
    });
    if (idUser !== userId) {
      addDoc(collection(database, 'users', idUser, 'activities'), {
        id_user: userId,
        id_post: idPost,
        description: ' comentou na sua publicação',
        timestamp: new Date(),
      })
    }
  }

  // Pegando todos os comentários do post
  useEffect(() => {
    const collectionRef = collection(database, 'posts', idPost, 'comments');
    const unsubscribe = onSnapshot(query(collectionRef, orderBy('timestamp', 'asc')), querySnapshot => {
      const data = querySnapshot.docs.map(doc => {
        const response = {
          id: doc.id,
          data: doc.data(),
        }
        return response;
      }) as PropsComments;
      setComments(data);
    });
    return unsubscribe;
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TextInput
                placeholder='Comentário'
                style={styles.input}
                onChangeText={setText}
              />
              <ButtonIcon
                iconName='send'
                color={theme.blue}
                onPress={handleAddCommentPost}
              />
            </View>

            <FlatList
              data={comments}
              keyExtractor={item => item.id}
              renderItem={({ item }) => 
                <Comment
                  comment={item.data.comment}
                  idUser={item.data.id_user}
                />
              }
              ItemSeparatorComponent={() => 
                <Divider />
              }
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}