import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import ChatScreen from './components/ChatScreen/ChatScreen';
import Test from './components/Test/Test';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <ChatScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(62, 6, 206, 1)',
    //paddingTop: 200,
    flex: 1,
  },
});

export default App;
