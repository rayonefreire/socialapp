import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 34,
    gap: 50,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: theme.blue,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textFooter: {
    fontSize: 18,
    marginRight: 10,
  },
});