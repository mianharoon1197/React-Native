import { StyleSheet, View } from 'react-native';
import SignUp from './components/Main/SignUp';
import BottomCurve from './components/BottomCurve/BottomCurve';
import TopCurve from './components/TopCurve/TopCurve';
function App() {
  return (
    <View style={styles.container}>
      <TopCurve />
      <SignUp/>
      <BottomCurve />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
});
export default App;
