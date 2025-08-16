"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, RefreshControl } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const DashboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false)
  const [upcomingServices, setUpcomingServices] = useState([
    {
      id: 1,
      service: "Oil Change",
      date: "2024-02-15",
      time: "10:00 AM",
      vehicle: "Honda Civic 2020",
      status: "Confirmed",
      mechanic: "John Smith",
    },
    {
      id: 2,
      service: "Engine Tune Up",
      date: "2024-02-20",
      time: "2:00 PM",
      vehicle: "Honda Civic 2020",
      status: "Pending",
      mechanic: "Mike Johnson",
    },
  ])

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your oil change is due next week", type: "reminder", time: "2 hours ago" },
    { id: 2, message: "Service completed successfully", type: "success", time: "1 day ago" },
    { id: 3, message: "New service packages available", type: "info", time: "2 days ago" },
  ])

  const quickActions = [
    {
      title: "Book Service",
      icon: "build",
      color: "#2196F3",
      screen: "Book Service",
      description: "Schedule new service",
    },
    {
      title: "Service History",
      icon: "history",
      color: "#4CAF50",
      screen: "History",
      description: "View past services",
    },
    {
      title: "Profile",
      icon: "person",
      color: "#FF9800",
      screen: "Profile",
      description: "Manage account",
    },
    {
      title: "Support",
      icon: "support-agent",
      color: "#9C27B0",
      screen: "Support",
      description: "Get help",
    },
  ]

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "#4CAF50"
      case "Pending":
        return "#FF9800"
      case "Completed":
        return "#2196F3"
      default:
        return "#666"
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity style={styles.profileImage} onPress={() => navigation.navigate("Profile")}>
            <Image source={{ uri: "/placeholder.svg?height=50&width=50" }} style={styles.avatar} />
            <View style={styles.onlineIndicator} />
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
                onPress={() => navigation.navigate(action.screen)}
              >
                <Icon name={action.icon} size={32} color={action.color} />
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upcoming Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {upcomingServices.length > 0 ? (
            upcomingServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                onPress={() => navigation.navigate("ServiceDetail", { service })}
              >
                <View style={styles.serviceCardLeft}>
                  <View style={styles.serviceIconContainer}>
                    <Icon name="build" size={24} color="#2196F3" />
                  </View>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.service}</Text>
                    <Text style={styles.serviceDetails}>
                      {service.date} at {service.time}
                    </Text>
                    <Text style={styles.vehicleInfo}>{service.vehicle}</Text>
                    <Text style={styles.mechanicInfo}>Mechanic: {service.mechanic}</Text>
                  </View>
                </View>
                <View style={styles.serviceStatus}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(service.status) + "20" }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(service.status) }]}>{service.status}</Text>
                  </View>
                  <Icon name="chevron-right" size={20} color="#ccc" />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="event-available" size={60} color="#ccc" />
              <Text style={styles.emptyStateText}>No upcoming services</Text>
              <TouchableOpacity style={styles.bookNowButton} onPress={() => navigation.navigate("Book Service")}>
                <Text style={styles.bookNowText}>Book Service Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notifications</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {notifications.slice(0, 3).map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={styles.notificationCard}
              onPress={() => navigation.navigate("Notifications")}
            >
              <View style={styles.notificationIcon}>
                <Icon
                  name={
                    notification.type === "reminder"
                      ? "schedule"
                      : notification.type === "success"
                        ? "check-circle"
                        : "info"
                  }
                  size={20}
                  color={
                    notification.type === "reminder"
                      ? "#FF9800"
                      : notification.type === "success"
                        ? "#4CAF50"
                        : "#2196F3"
                  }
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Service Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Icon name="build" size={30} color="#2196F3" />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Total Services</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="schedule" size={30} color="#FF9800" />
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="star" size={30} color="#FFD700" />
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  profileImage: {
    position: "relative",
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionTitle: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  quickActionDescription: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceCardLeft: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  serviceIconContainer: {
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
  serviceDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  vehicleInfo: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  mechanicInfo: {
    fontSize: 12,
    color: "#2196F3",
  },
  serviceStatus: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyState: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 15,
    marginBottom: 20,
  },
  bookNowButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bookNowText: {
    color: "white",
    fontWeight: "bold",
  },
  notificationCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: "#999",
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
})

export default DashboardScreen
