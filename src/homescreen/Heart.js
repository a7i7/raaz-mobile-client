import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const Heart = ({ filled, style, ...props }) => {
  const centerNonFilled = (
    <View style={[StyleSheet.absoluteFill, styles.fit]}>
      <View style={[styles.leftHeart, styles.heartShape, styles.emptyFill]} />
      <View style={[styles.rightHeart, styles.heartShape, styles.emptyFill]} />
    </View>
  );
  const fillStyle = filled ? styles.filledHeart : styles.empty;

  return (
    <Animated.View {...props} style={[styles.heart, style]}>
      <View style={[styles.leftHeart, styles.heartShape, fillStyle]} />
      <View style={[styles.rightHeart, styles.heartShape, fillStyle]} />
      {!filled && centerNonFilled}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heart: {
    width: 30,
    height: 30,
    backgroundColor: "transparent",
  },
  heartShape: {
    width: 15,
    height: 45 * (15 / 30),
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  filledHeart: {
    backgroundColor: "#e31745",
  },
  fit: {
    transform: [{ scale: 0.9 }],
  },
  emptyFill: {
    backgroundColor: "#FFF",
  },
  empty: {
    backgroundColor: "#ccc",
    borderWidth: 0.5,
  },
  leftHeart: {
    transform: [{ rotate: "-45deg" }],
    left: 5,
  },
  rightHeart: {
    transform: [{ rotate: "45deg" }],
    right: 5,
  },
});

export default Heart;
