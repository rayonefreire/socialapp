import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 20,
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: theme.lightgray,
    fontSize: 18,
    borderRadius: 10,
    paddingLeft: 10,
  },
});