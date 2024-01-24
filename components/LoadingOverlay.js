import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import BackGround from './BackGround';

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <BackGround />
      <ActivityIndicator size="large" color='white'/>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 32,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
    color:'white',
  },
});