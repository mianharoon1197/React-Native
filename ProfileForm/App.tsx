import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import TopCurve from './components/TopCurve/TopCurve';
import MainContent from './components/MainContent/MainContent';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'dark-content' : 'light-content'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <TopCurve />
          <MainContent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
});

export default App;
