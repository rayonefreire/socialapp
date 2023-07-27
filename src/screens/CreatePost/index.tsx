import React, { useState } from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Video, ResizeMode } from 'expo-av';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

import { styles } from './styles';
import { auth, database, storage } from '../../../config/firebase';
import { theme } from '../../styles/theme';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function CreatePost(){
  const [text, setText] = useState(String);
  const [loading, setLoading] = useState(false);
  const [midia, setMidia] = useState<ImagePicker.ImagePickerAsset[]>();

  const userId = auth.currentUser?.uid;

  async function handlePost() {
    if (midia) {
      setLoading(true);
      const response = await fetch(midia[0].uri);
      const blob = await response.blob();
      const imageName = new Date().getTime() + '.jpg';
      const imageRef = ref(storage, 'posts/' + imageName);
      await uploadBytesResumable(imageRef, blob);
      const url = await getDownloadURL(imageRef);
  
      addDoc(collection(database, 'posts'), {
        id_user: userId,
        url: url,
        type_midia: midia[0].type,
        description: text,
        timestamp: new Date(),
      })
        .then(() => console.log('Publicação feita com sucesso'))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
  }

  async function handlePickMidia() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setMidia(result.assets);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={theme.blue} size='large' />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {midia ?
            <View style={styles.formPost}>
              {midia[0].type === 'image' ?
                <Image
                  source={{ uri: midia[0].uri }}
                  style={styles.midia}
                  resizeMode='cover'
                /> : 
                <Video
                  style={styles.midia}
                  source={{
                    uri: midia[0].uri,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                />
              }
              <Input
                placeholder='Legenda'
                onChangeText={setText}
              />
              <Button
                title='Postar'
                onPress={handlePost}
              />
            </View> :
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.container}
              onPress={handlePickMidia}
            >
              <Text style={styles.title}>Escolher mídia</Text>
            </TouchableOpacity>
          }
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}