import axios from 'axios';


import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar } from "expo-status-bar"
import Icon from "react-native-vector-icons/MaterialIcons"

// Import screens
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import HomeScreen from "./screens/HomeScreen"
import ServicesScreen from "./screens/ServicesScreen"
import BookingsScreen from "./screens/BookingsScreen"
import ProfileScreen from "./screens/ProfileScreen"
import PaymentScreen from './screens/PaymentScreen';
import BookServiceScreen from "./screens/BookServiceScreen";
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
import DashboardScreen from "./screens/DashboardScreen";
import {SafeAreaView, StyleSheet} from "react-native";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


// Bottom Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = "home"
          } else if (route.name === "Services") {
            iconName = "build"
          } else if (route.name === "Bookings") {
            iconName = "event"
          } else if (route.name === "Profile") {
            iconName = "person"
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
    </Tab.Navigator>
  )
}

// Main App Navigator
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="BookService" component={BookServiceScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

// export default function App() {
//   return (
//       <NavigationContainer>
//           <SafeAreaView style={styles.container}>

//               <Stack.Navigator
//                   initialRouteName="Main"
//                   screenOptions={{
//                       headerShown: false,
//                   }}
//               >
//                   <Stack.Screen name="Login" component={LoginScreen} />
//                   <Stack.Screen name="Register" component={RegisterScreen} />
//                   <Stack.Screen name="Main" component={MainTabNavigator} />
//               </Stack.Navigator>
//           </SafeAreaView>
//       </NavigationContainer>
//   )
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30,
    }
})



// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { StatusBar } from "expo-status-bar";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import { SafeAreaView, StyleSheet } from "react-native";


// // Import screens
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import HomeScreen from "./screens/HomeScreen";
// import ServicesScreen from "./screens/ServicesScreen";
// import BookingsScreen from "./screens/BookingsScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import PaymentScreen from './screens/PaymentScreen';
// import BookServiceScreen from "./screens/BookServiceScreen";
// import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
// import DashboardScreen from "./screens/DashboardScreen";


// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Bottom Tab Navigator
// const MainTabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           if (route.name === "Home") {
//             iconName = "home";
//           } else if (route.name === "Services") {
//             iconName = "build";
//           } else if (route.name === "Bookings") {
//             iconName = "event";
//           } else if (route.name === "Profile") {
//             iconName = "person";
//           }

//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#2196F3",
//         tabBarInactiveTintColor: "gray",
//         tabBarStyle: {
//           backgroundColor: "white",
//           borderTopWidth: 1,
//           borderTopColor: "#e0e0e0",
//           height: 60,
//           paddingBottom: 5,
//           paddingTop: 5,
//         },
//         headerShown: false,
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Services" component={ServicesScreen} />
//       <Tab.Screen name="Bookings" component={BookingsScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
      
//     </Tab.Navigator>
//   );
// };



// // Main App Navigator
// export default function App() {
//   return (
//     <NavigationContainer>
//       <SafeAreaView style={styles.container}>
//         <StatusBar style="auto" />
//         <Stack.Navigator
//           initialRouteName="Main"
//           screenOptions={{ headerShown: false }}
//         >
          // <Stack.Screen name="Login" component={LoginScreen} />
          // <Stack.Screen name="Register" component={RegisterScreen} />
          // <Stack.Screen name="Main" component={MainTabNavigator} />
          // <Stack.Screen name="BookService" component={BookServiceScreen} />
          // <Stack.Screen name="Payment" component={PaymentScreen} />
          // <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
          // <Stack.Screen name="Dashboard" component={DashboardScreen} />
//         </Stack.Navigator>
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// }


// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// // });

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 10,
//         marginBottom: 30,
//     }
// })
