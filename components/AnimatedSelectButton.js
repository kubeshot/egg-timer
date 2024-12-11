import React from 'react';
import { Animated, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

const AnimatedSelectionButton = ({ 
  selected, 
  onPress, 
  label, 
  time, 
  icon 
}) => {
  // Create animated value for border
  const borderAnim = React.useRef(new Animated.Value(selected ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(borderAnim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      tension: 50,
      friction: 8
    }).start();
  }, [selected]);

  const animatedStyle = {
    borderWidth: borderAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2]
    }),
    transform: [{
      scale: borderAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.02]
      })
    }]
  };

  return (
    <Animated.View style={[styles.buttonContainer, animatedStyle]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
        activeOpacity={0.7}
      >
        <View style={styles.leftContent}>
          {selected && icon && (
            <Animated.View
              style={{
                opacity: borderAnim
              }}
            >
              {icon}
            </Animated.View>
          )}
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <Text style={styles.timeText}>{time}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 100,
    marginVertical: 8,
    borderColor: 'black',
    overflow: 'hidden'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  labelText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold'
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold'
  }
});

export default AnimatedSelectionButton;