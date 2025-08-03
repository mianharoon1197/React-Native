import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const BottomCurve = () => {
  return (
    <View style={styles.curve}>
      <Svg width="100%" height={190} viewBox="0 0 600 120">
        <Defs>
          <LinearGradient id="grad" x1="0.8" y1="0" x2="0.9" y2="0.8">
            <Stop offset="0%" stopColor="#7F00FF" />
            <Stop offset="100%" stopColor="#007BFF" />
          </LinearGradient>
        </Defs>

        <Path
          d={`
            M 0 50 
            Q 60 32 130 55
            Q 240 95 258 200 
            L 0 200 Z
          `}
          fill="url(#grad)"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  curve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width:"100%",
  },
});

export default BottomCurve;
