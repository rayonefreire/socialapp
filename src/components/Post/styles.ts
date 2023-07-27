import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 19,
  },
  post: {
    marginVertical: 10,
  },
  midia: {
    height: 400,
    width: '100%'
  },
  description: {
    fontSize: 16,
    marginLeft: 19,
    marginTop: 10,
  },
  likes: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 19,
    marginTop: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 15,
  }
});