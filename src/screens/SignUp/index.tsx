import React, { useState } from 'react';

import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'

import { auth, database, storage } from '../../../config/firebase';
import { styles } from './styles';
import { theme } from '../../styles/theme';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

export function SignUp(){
  const [image, setImage] = useState(String);
  const [name, setName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handlePickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  function handleSignUp() {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        console.log('Conta criada com sucesso');
        const response = await fetch(image);
        const blob = await response.blob();
        const imageName = new Date().getTime() + '.jpg';
        const imageRef = ref(storage, 'users/' + imageName);
        await uploadBytesResumable(imageRef, blob);
        const url = await getDownloadURL(imageRef);

        setDoc(doc(database, 'users', data.user.uid), {
          username: name,
          avatar_url: url,
        });
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  function handleNavigateSignInScreen() {
    navigation.navigate('SignIn');
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>
              Criar conta
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePickImage}
          >
            <Image
              source={{
                uri: image ? image :
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlysovRqSseA4uUGlio_vESy9xFc5OS7jXOva3NlE&s' }}
              style={styles.image}
            />
          </TouchableOpacity>

          <Input
            placeholder='Nome'
            onChangeText={setName}
          />

          <Input
            placeholder='Email'
            keyboardType='email-address'
            onChangeText={setEmail}
          />

          <Input
            placeholder='Senha'
            keyboardType='visible-password'
            onChangeText={setPassword}
            secureTextEntry
          />

          {loading ?
            <ActivityIndicator size='small' color={theme.blue} /> :
            <Button
              title='Criar conta'
              onPress={handleSignUp}
            />
          }

          <View style={styles.footer}>
            <Text style={styles.textFooter}>Já tem uma conta?</Text>
            <ButtonText
              title='Entrar'
              titleColor={theme.blue}
              onPress={handleNavigateSignInScreen}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}