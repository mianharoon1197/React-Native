import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';

function SignUp() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text style={styles.signupText}>Sign Up</Text>

      <View style={styles.shadowWrapper}>
        <Ionicons name="person-circle-outline" size={30} color="#7F00FF" />
        <TextInput style={styles.inputBox} placeholder="Name" />
      </View>

      <View style={styles.shadowWrapper}>
        <Ionicons name="mail-open" size={30} color="#7F00FF" />
        <TextInput style={styles.inputBox} placeholder="E-mail" />
      </View>

      <View style={styles.shadowWrapper}>
        <Ionicons name="lock-closed" size={30} color="#7F00FF" />

        <View style={styles.eyeIcon}>
          <TextInput style={styles.inputBox} placeholder="Password" />
          <Ionicons name="eye-outline" size={25} color="#7F00FF" />
        </View>
      </View>

      <View style={styles.terms}>
        <CheckBox
          tintColors={{ true: '#7F00FF', false: '#6d2dacff' }}
          style={styles.checkBox}
        />
        <Text style={styles.termsText}>
          I read and agree to{' '}
          <Text style={styles.link}>Terms & Conditions</Text>
        </Text>
      </View>

      <LinearGradient
        colors={['#7F00FF', '#007BFF']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 2, y: 1 }}
        style={styles.button}
      >
        <TouchableOpacity>
          <Text style={styles.buttontext}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.signinRow}>
        <Text style={styles.signinText}>Already have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  signupText: {
    textAlign: 'center',
    marginBottom: 50,
    fontSize: 30,
    fontWeight: 'bold',
  },
  shadowWrapper: {
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 30,
    elevation: 20,
    shadowColor: '#7F00FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  eyeIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    marginLeft: 5,
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  checkBox: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  termsText: {
    fontSize: 11,
    color: '#444',
  },
  link: {
    color: '#7F00FF',
    fontSize: 12,
  },
  button: {
    borderRadius: 50,
    padding: 5,
    margin: 10,
    alignItems: 'center',
  },
  buttontext: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    paddingVertical: 5,
  },
  signinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinText: {
    fontSize: 11,
    color: '#444',
  },
});

export default SignUp;
