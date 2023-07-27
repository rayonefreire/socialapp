import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 34,
    gap: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: theme.blue,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
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