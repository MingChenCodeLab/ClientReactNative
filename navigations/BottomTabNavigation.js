import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Notification from "../Screen/Notification";
import LikeProducts from "../Screen/Informations/LikeProducts";
import Profile from "../Screen/Informations/Profile";

import Home from "../Screen/Home/Home";

import Cart from "../Screen/Cart/Cart";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import * as Animatable from "react-native-animatable";
import React, { useRef, useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import CartBadge from "../components/Cart/CartBadge";
function TabButton({ onPress, accessibilityState, children }) {
  const viewRef = useRef(null);
  useEffect(() => {
    if (accessibilityState.selected) {
      viewRef.current.animate(
        {
          0: { scale: 0.5, opacity: 0.7 },
          0.5: { scale: 1.2, opacity: 1 },
          1: { scale: 2, opacity: 1 },
        },
        500
      );
    } else {
      viewRef.current.animate(
        {
          0: { scale: 1, opacity: 1 },
          1: { scale: 1.5, opacity: 1 },
        },
        500
      );
    }
  }, [accessibilityState.selected]);
  return (
    <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
      <Animatable.View ref={viewRef} duration={500} style={{ flex: 1 }}>
        {children}
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
}
const MemoizedCart = React.memo(Cart);
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
          position: "absolute",
          backgroundColor: "#fff",
          borderRadius: 30,
          marginHorizontal: 5,
          marginBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          title: "Chào mừng bạn",
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarShowLabel: false,
          title: "Thông báo",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={20} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={MemoizedCart}
        options={{
          tabBarShowLabel: false,
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <View style={{ position: "relative" }}>
              <MaterialCommunityIcons name="cart" color={color} size={20} />
              <CartBadge />
            </View>
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="LikeProducts"
        component={LikeProducts}
        options={{
          tabBarShowLabel: false,
          title: "Sản phẩm yêu thích",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={20} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
        lazy={true}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={20} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
        lazy={true}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
