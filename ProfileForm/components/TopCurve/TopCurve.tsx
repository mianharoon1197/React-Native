import React from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ImageBackground
          source={require('../../assets/building.jpg')}
          style={styles.topImage}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Ionicons
            name="arrow-back-outline"
            size={25}
            style={styles.iconArrow}
          ></Ionicons>
          <Text style={styles.companyText}>Company Profile</Text>
        </ImageBackground>

        <View style={styles.curve}>
          <View
            style={[styles.leftCurve, { transform: [{ rotate: '-7deg' }] }]}
          />
        </View>

        <View style={styles.circleContainer}>
          <Image
            source={require('../../assets/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileBadge} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    width: '100%',
    height: 350,
    color: 'red',
    overflow: 'hidden',
  },
  topImage: {
    width: '100%',
    height: 300,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,100,200,0.4)',
  },

  iconArrow: {
    color: '#fff',
    top: 50,
    left: 10,
  },
  companyText: {
    textAlign: 'center',
    fontSize: 18,
    top: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  curve: {
    width: '140%',
    height: '100%',
    backgroundColor: '#33bbee',
    borderRadius: '100%',
    bottom: -200,
    position: 'absolute',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  leftCurve: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    bottom: 0,
    borderRadius: '100%',
  },
  circleContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    alignSelf: 'center',
    top: 145,
    //overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profileBadge: {
    position: 'absolute',
    right: 3,
    top: '50%',
    transform: [{ translateY: -40 }],
    width: 15,
    height: 15,
    backgroundColor: '#fff',
    borderRadius: 7.5,
    borderWidth: 3,
    borderColor: 'blue',
  },
});
