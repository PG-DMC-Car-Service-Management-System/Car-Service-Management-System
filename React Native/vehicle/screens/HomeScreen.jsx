"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView,  TouchableOpacity, Image, RefreshControl } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const quickActions = [
    {
      title: "Book Service",
      icon: "build",
      color: "#2196F3",
      onPress: () => navigation.navigate("Services"),
    },
    {
      title: "My Bookings",
      icon: "event",
      color: "#4CAF50",
      onPress: () => navigation.navigate("Bookings"),
    },
    {
      title: "Emergency",
      icon: "warning",
      color: "#FF5722",
      onPress: () => {},
    },
    {
      title: "Support",
      icon: "support-agent",
      color: "#9C27B0",
      onPress: () => {},
    },
  ]

  const recentServices = [
    {
      id: 1,
      service: "Oil Change",
      date: "2024-01-15",
      status: "Completed",
      amount: "₹4500.00",
    },
    {
      id: 2,
      service: "Tire Rotation",
      date: "2024-01-10",
      status: "Completed",
      amount: "₹3500.00",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.userName}>Car Service</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Image source={{ uri: "/placeholder.svg?height=50&width=50" }} style={styles.profileImage} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.quickActionCard, { borderLeftColor: action.color }]}
                onPress={action.onPress}
              >
                <Icon name={action.icon} size={30} color={action.color} />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Icon name="build" size={30} color="#2196F3" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Total Services</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="schedule" size={30} color="#FF9800" />
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="star" size={30} color="#FFD700" />
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Recent Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Bookings")}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <Icon name="build" size={24} color="#2196F3" />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.service}</Text>
                <Text style={styles.serviceDate}>{service.date}</Text>
              </View>
              <View style={styles.serviceStatus}>
                <Text style={styles.serviceAmount}>{service.amount}</Text>
                <Text style={[styles.statusText, { color: "#4CAF50" }]}>{service.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Promotional Banner */}
        <View style={styles.section}>
          <View style={styles.promoBanner}>
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Special Offer!</Text>
              <Text style={styles.promoText}>Get 20% off on your next service booking</Text>
              <TouchableOpacity style={styles.promoButton}>
                <Text style={styles.promoButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
            <Icon name="local-offer" size={60} color="#FF9800" />
          </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: "#666",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  section: {
    margin: 20,
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  viewAllText: {
    color: "#2196F3",
    fontSize: 14,
    fontWeight: "500",
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
    backgroundColor: "white",
    width: "48%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  quickActionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  serviceCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 14,
    color: "#666",
  },
  serviceStatus: {
    alignItems: "flex-end",
  },
  serviceAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  promoBanner: {
    backgroundColor: "#FFF3E0",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E65100",
    marginBottom: 5,
  },
  promoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  promoButton: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
})

export default HomeScreen
