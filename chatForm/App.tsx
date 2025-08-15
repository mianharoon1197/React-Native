import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import Chat from './components/ChatScreen/Chat';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <Chat/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'rgba(12, 227, 84, 1)'
  },
});

export default App;
