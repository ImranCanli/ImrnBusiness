import { View, Text, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Colors } from '../constants/Colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BottomSheet = forwardRef(({children}, ref) => {
  const tranlateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 200;
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    'worklet';

    active.value = destination !== 0;
    tranlateY.value = withTiming(destination);
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, [])

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: tranlateY.value };
    })
    .onUpdate(({ translationY }) => {
      tranlateY.value = translationY + context.value.y;
      tranlateY.value = Math.max(tranlateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (tranlateY.value > -SCREEN_HEIGHT / 2) {
        scrollTo(0);
      } else if (tranlateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });

//   useEffect(() => {
//     scrollTo(-SCREEN_HEIGHT / 3);
//   }, []);

  useImperativeHandle(ref, () => ({
    scrollTo,
    isActive,
  }), [
    scrollTo,
    isActive,
  ]);

  const rAnimatedSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      tranlateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [15, 5],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY: tranlateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH,
            backgroundColor: '#fff',
            position: 'absolute',
            top: SCREEN_HEIGHT,
            borderRadius: 15,
            alignSelf: 'center',
          },
          rAnimatedSheetStyle,
        ]}
      >
        <View
          style={{
            width: 75,
            height: 4,
            backgroundColor: Colors.GRAY,
            marginVertical: 10,
            alignSelf: 'center',
            borderRadius: 2,
          }}
        />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

export default BottomSheet;
