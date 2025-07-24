import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />
      <Image source={require('../MyApp/assets/haroon.jpg')} style={styles.img}/>
      <Text style={styles.heading}>🚀 React Native is Working!</Text>
      <Text style={styles.subheading}>Hello, Muhammad Haroon!</Text>

      <View style={styles.counterBox}>
        <Text style={styles.counterText}>You clicked {count} times</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>Click Me!</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>🎯 Powered by React Native + TypeScript</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 30,
  },
  counterBox: {
    backgroundColor: '#1f1f1f',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  counterText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00c896',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    color: '#888',
    fontSize: 14,
    marginTop: 30,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 10,
  }
});

export default App;
