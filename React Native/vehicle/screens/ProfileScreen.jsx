"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, Switch } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)

  const userInfo = {
    name: "Dip Chafale",
    email: "dip@gmail.com",
    phone: "675438976",
    memberSince: "2024",
    totalServices: 12,
    totalSpent: 850.0,
  }

  const menuItems = [
    {
      icon: "person",
      title: "Edit Profile",
      subtitle: "Update your personal information",
      onPress: () => Alert.alert("Edit Profile", "Navigate to edit profile screen"),
    },
    {
      icon: "directions-car",
      title: "My Vehicles",
      subtitle: "Manage your registered vehicles",
      onPress: () => Alert.alert("My Vehicles", "Navigate to vehicles screen"),
    },
    {
      icon: "payment",
      title: "Payment Methods",
      subtitle: "Manage your payment options",
      onPress: () => Alert.alert("Payment Methods", "Navigate to payment screen"),
    },
    {
      icon: "location-on",
      title: "Service Locations",
      subtitle: "Find nearby service centers",
      onPress: () => Alert.alert("Service Locations", "Navigate to locations screen"),
    },
    {
      icon: "star",
      title: "My Reviews",
      subtitle: "View your service reviews",
      onPress: () => Alert.alert("My Reviews", "Navigate to reviews screen"),
    },
    {
      icon: "support-agent",
      title: "Customer Support",
      subtitle: "Get help and support",
      onPress: () => Alert.alert("Customer Support", "Contact support"),
    },
    {
      icon: "info",
      title: "About",
      subtitle: "App version and information",
      onPress: () => Alert.alert("About", "App Version 1.0.0"),
    },
  ]

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.replace("/Login"),
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <Image source={{ uri: "/placeholder.svg?height=100&width=100" }} style={styles.profileImage} />
            <View style={styles.editImageButton}>
              <Icon name="camera-alt" size={16} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          <Text style={styles.memberSince}>Member since {userInfo.memberSince}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="build" size={24} color="#2196F3" />
            <Text style={styles.statNumber}>{userInfo.totalServices}</Text>
            <Text style={styles.statLabel}>Services</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="attach-money" size={24} color="#4CAF50" />
            <Text style={styles.statNumber}>₹{userInfo.totalSpent}</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="star" size={24} color="#FFD700" />
            <Text style={styles.statNumber}>4.8</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="notifications" size={20} color="#2196F3" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notifications</Text>
                <Text style={styles.settingSubtitle}>Receive service reminders</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#ccc", true: "#2196F3" }}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="dark-mode" size={20} color="#2196F3" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingSubtitle}>Switch to dark theme</Text>
              </View>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: "#ccc", true: "#2196F3" }}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <Icon name={item.icon} size={20} color="#2196F3" />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#F44336" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: "white",
    alignItems: "center",
    padding: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2196F3",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  memberSince: {
    fontSize: 14,
    color: "#999",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  statCard: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  section: {
    margin: 20,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  settingItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  settingSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  menuItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    marginLeft: 15,
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#ffcdd2",
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#F44336",
  },
})

export default ProfileScreen

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   ScrollView,
//   ActivityIndicator,
//   StyleSheet,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const getUserData = async () => {
//     try {
//       const storedUserData = await AsyncStorage.getItem("userData");
//       if (storedUserData !== null) {
//         const parsedData = JSON.parse(storedUserData);
//         setUserData(parsedData);
//       } else {
//         setUserData(null);
//       }
//     } catch (error) {
//       console.error("Error retrieving user data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </SafeAreaView>
//     );
//   }

//   if (!userData) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.warningText}>No user data found. Please log in.</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Text style={styles.heading}>Profile</Text>
//         <Text style={styles.label}>Name:</Text>
//         <Text style={styles.value}>{userData.name}</Text>

//         <Text style={styles.label}>Email:</Text>
//         <Text style={styles.value}>{userData.email}</Text>

//         <Text style={styles.label}>Phone:</Text>
//         <Text style={styles.value}>{userData.phone}</Text>

//         <Text style={styles.label}>Address:</Text>
//         <Text style={styles.value}>{userData.address}</Text>

//         <Text style={styles.label}>Vehicle No:</Text>
//         <Text style={styles.value}>{userData.vehicle_no}</Text>

//         <Text style={styles.label}>Vehicle Model:</Text>
//         <Text style={styles.value}>{userData.vehicle_model}</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f2f2f2",
//   },
//   contentContainer: {
//     paddingBottom: 20,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginTop: 10,
//   },
//   value: {
//     fontSize: 16,
//     color: "#333",
//   },
//   warningText: {
//     fontSize: 16,
//     color: "red",
//     textAlign: "center",
//     marginTop: 50,
//   },
// });

// export default ProfileScreen;

