import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const BottomCurve = () => {
  return (
    <View style={styles.curve}>
      <Svg width={300} height={250} viewBox="0 0 300 120">
        <Defs>
          <LinearGradient id="grad" x1="0.2" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor="#7F00FF" />
            <Stop offset="25%" stopColor="#7F00FF" />
            <Stop offset="100%" stopColor="#007BFF" />
          </LinearGradient>
        </Defs>

        <Path
          d={`
            M 0 50 
            Q 80 28 147 60
            Q 248 115 257 200 
            L 0 200 
            Z
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
  },
});

export default BottomCurve;
