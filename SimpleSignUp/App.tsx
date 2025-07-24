import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const handleSubmit = () => {};
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.heading}>Sign Up</Text>

      <Text style={styles.text}>Enter Name</Text>
      <TextInput style={styles.textBox} placeholder="Haroon" />

      <Text style={styles.text}>Enter Email</Text>
      <TextInput style={styles.textBox} placeholder="abc@gmail.com" />

      <Text style={styles.text}>Enter Password</Text>
      <TextInput style={styles.textBox} placeholder="abcdefg" />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2af107ff',
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 20,
  },
  buttontext: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
