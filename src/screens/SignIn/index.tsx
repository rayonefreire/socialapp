import React, { useState } from 'react';

import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import { auth } from '../../../config/firebase';
import { styles } from './styles';
import { theme } from '../../styles/theme';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

export function SignIn(){
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  
  function handleSignIn() {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => console.log('Usuário logado com sucesso'))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  function handleNavigateSignUpScreen() {
    navigation.navigate('SignUp');
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
              Entre
            </Text>
          </View>

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
              title='Entrar'
              onPress={handleSignIn}
            />
          }

          <View style={styles.footer}>
            <Text style={styles.textFooter}>Não tem uma conta?</Text>
            <ButtonText
              title='Criar conta'
              titleColor={theme.blue}
              onPress={handleNavigateSignUpScreen}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}