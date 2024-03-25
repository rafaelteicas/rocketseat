import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#1F1E25',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
    marginLeft: 16
  },
   buttonText: {
    color: '#FFF',
    fontSize: 24
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 5,
    backgroundColor: '#E23C44',
    justifyContent: 'center',
    alignItems: 'center'
  },
})