import React from "react";
import { View,  StyleSheet } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import PropertyCard from "./PropertyCard";

const cardWidth = 208;
const cardGap = 16;
const fullCardWidth = cardWidth + cardGap;

const data = [
  { title: "Slide 1", description: "tomato", price: "₹ 9,000/Mo", uploadedAt: "2 sec ago", postedBy: "Agent" },
  { title: "Slide 2", description: "skyblue", price: "₹ 4,000/Mo", uploadedAt: "5 hrs ago", postedBy: "Landlord" },
  { title: "Slide 3", description: "lightgreen", price: "₹ 7,000/Mo", uploadedAt: "6 days ago", postedBy: "Agent" },
];

const Swiper = () => {
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startX: number }>({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      const threshold = fullCardWidth;
      const velocityThreshold = 800;
      const totalItems = data.length - 1;

      if (event.translationX < -threshold || event.velocityX < -velocityThreshold) {
        currentIndex.value = Math.min(currentIndex.value + 1, totalItems);
      } else if (event.translationX > threshold || event.velocityX > velocityThreshold) {
        currentIndex.value = Math.max(currentIndex.value - 1, 0);
      }

      translateX.value = withSpring(-currentIndex.value * fullCardWidth);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {data.map((item, index) => (
          <View key={index} style={{ marginRight: cardGap }}>
            <PropertyCard property={item} />
          </View>
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Swiper;
