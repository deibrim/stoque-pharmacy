import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Onboarding from "../screens/Onboarding/Onboarding";
import BottomTabNavigator from "./BottomTabNavigatorCustom";
import Register from "../screens/Register/Register";
import Login from "../screens/Login/Login";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import { auth, firestore } from "../firebase/config";
import { createShopAdminProfile } from "../firebase/auth";
import { setCurrentUser } from "../redux/user/actions";
import RenewLicense from "../screens/RenewLicense/RenewLicense";

function Navigation({ colorScheme }) {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(async (User) => {
      if (User) {
        const userRef = await createShopAdminProfile(User);
        userRef.onSnapshot(async (snapShot) => {
          const data = { id: snapShot.id, ...snapShot.data() };
          dispatch(setCurrentUser(data));

          const notificationRef = await firestore
            .collection("notifications")
            .doc(snapShot.id)
            .collection("feedItems")
            .where("viewed", "==", false);
          notificationRef.onSnapshot(async (snapShot) => {
            if (snapShot.size > 0) {
              // dispatch(toggleHasNoty(true));
            }
          });
        });
      }
    });
  }, [""]);

  const renderer = () => {
    const subExpired =
      new Date(Date.now()).getTime() >= currentUser.subExpireDate;
    if (currentUser.hasSubcribedBefore && subExpired) {
      return <LicenseNavigator type="renew" />;
    } else if (!currentUser.hasSubcribedBefore) {
      return <LicenseNavigator type="subscribe" />;
    } else {
      return <RootNavigator />;
    }
  };
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {currentUser ? renderer() : <AuthNavigator />}
    </NavigationContainer>
  );
}

const RootStack = createStackNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
    </RootStack.Navigator>
  );
}

const LicenseStack = createStackNavigator();

function LicenseNavigator({ type }) {
  return (
    <LicenseStack.Navigator screenOptions={{ headerShown: false }}>
      <LicenseStack.Screen
        name="Root"
        children={() => <RenewLicense type={type} />}
        options={{ headerShown: false }}
      />
    </LicenseStack.Navigator>
  );
}

const AuthStack = createStackNavigator();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Root"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{ title: "Register" }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ title: "Login" }}
      />
      <AuthStack.Screen
        name="Reset"
        component={ForgotPassword}
        options={{ title: "Reset Password" }}
      />
    </AuthStack.Navigator>
  );
}

export default Navigation;
