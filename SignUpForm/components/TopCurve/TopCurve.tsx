import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopCurve = () => {
  return (
    <View style={styles.container}>
      <Svg width={400} height={350} viewBox="0 0 225 500" style={styles.svg}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0.4" x2="0.2" y2="1">
            <Stop offset="0%" stopColor="#7F00FF" />
            <Stop offset="100%" stopColor="#007BFF" />
          </LinearGradient>
        </Defs>
        <Path
          d={`
          M 15 0 
          Q 10 82 185 77 
          Q 270 78 295 155 
          Q 330 250 400 250 
          L 400 0 
          Z
          `}
          fill="url(#grad)"
        />
      </Svg>

      <Ionicons name="close-outline" size={40} style={styles.closeIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 50,
    zIndex: 1,
  },
  svg: {
    alignSelf: 'flex-end',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 10,
    color: '#fff',
  },
});

export default TopCurve;
