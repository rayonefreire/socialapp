import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  avatarUrl: {
    height: 34,
    width: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  comment: {
    fontSize: 16,
  },
});