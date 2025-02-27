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
import { useQuery } from '@tanstack/react-query';

import { fetchRecentlyPosted } from '@/services/home.service';
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { RecentlyPostedData } from "@/types/types";

const cardWidth = 208;
const cardGap = 16;
const fullCardWidth = cardWidth + cardGap;

const Swiper = () => {
  const { data, isLoading, error } = useQuery<RecentlyPostedData>({
    queryKey: ["recentlyPosted"],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    queryFn: fetchRecentlyPosted,
  });

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
      const totalItems = (data?.recentProperties?.length || 1) - 1;

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

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const recentProperties = data?.recentProperties || []; 
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {recentProperties?.map((item, index) => (
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
