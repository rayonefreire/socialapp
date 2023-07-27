import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: theme.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: theme.white,
  }
});