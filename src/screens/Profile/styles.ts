import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  avatarUrl: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  info: {
    fontSize: 18,
  },
  followButton: {
    height: 35,
    width: 150,
    backgroundColor: theme.blue,
    borderRadius: 10,
    marginHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleButton: {
    fontSize: 18,
    color: theme.white,
  },
});