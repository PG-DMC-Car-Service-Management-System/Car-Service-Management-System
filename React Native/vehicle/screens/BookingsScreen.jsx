"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, RefreshControl } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const BookingsScreen = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTab, setSelectedTab] = useState("upcoming")

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`http://192.168.1.44:3000/bookings?customer_id=1`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchBookings();
}, []);


  const bookings = [
    {
      id: 1,
      service: "Oil Change",
      date: "2024-02-20",
      time: "10:00 AM",
      status: "confirmed",
      mechanic: "John Smith",
      vehicle: "Honda Civic 2020",
      amount: 4500.0,
      location: "Main Service Center",
    },
    {
      id: 2,
      service: "Brake Service",
      date: "2024-02-25",
      time: "2:00 PM",
      status: "pending",
      mechanic: "Mike Johnson",
      vehicle: "Honda Civic 2020",
      amount: 2200.0,
      location: "Downtown Branch",
    },
    {
      id: 3,
      service: "Engine Tune-up",
      date: "2024-01-15",
      time: "9:00 AM",
      status: "completed",
      mechanic: "Sarah Wilson",
      vehicle: "Honda Civic 2020",
      amount: 2500.0,
      location: "Main Service Center",
      rating: 5,
    },
    {
      id: 4,
      service: "Tire Rotation",
      date: "2024-01-10",
      time: "11:00 AM",
      status: "completed",
      mechanic: "David Brown",
      vehicle: "Honda Civic 2020",
      amount: 3500.0,
      location: "North Branch",
      rating: 4,
    },
    {
      id: 5,
      service: "Battery Check",
      date: "2024-01-05",
      time: "3:00 PM",
      status: "cancelled",
      mechanic: "John Smith",
      vehicle: "Honda Civic 2020",
      amount: 2800.0,
      location: "Main Service Center",
    },
  ]

  const tabs = [
    { id: "upcoming", name: "Upcoming", icon: "schedule" },
    { id: "completed", name: "Completed", icon: "check-circle" },
    { id: "cancelled", name: "Cancelled", icon: "cancel" },
  ]

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#4CAF50"
      case "pending":
        return "#FF9800"
      case "completed":
        return "#2196F3"
      case "cancelled":
        return "#F44336"
      default:
        return "#666"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "check-circle"
      case "pending":
        return "schedule"
      case "completed":
        return "done-all"
      case "cancelled":
        return "cancel"
      default:
        return "help"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (selectedTab === "upcoming") {
      return booking.status === "confirmed" || booking.status === "pending"
    }
    return booking.status === selectedTab
  })

  const handleCancelBooking = (booking) => {
    Alert.alert("Cancel Booking", `Are you sure you want to cancel your ₹${booking.service} appointment?`, [
      { text: "No", style: "cancel" },
      { text: "Yes, Cancel", style: "destructive", onPress: () => console.log("Cancelled:", booking.id) },
    ])
  }

  const handleReschedule = (booking) => {
    Alert.alert("Reschedule", `Reschedule ₹${booking.service} appointment`)
  }

  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(<Icon key={i} name="star" size={16} color={i <= rating ? "#FFD700" : "#ddd"} />)
    }
    return <View style={styles.starsContainer}>{stars}</View>
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
        <Text style={styles.subtitle}>Manage your service appointments</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Icon name={tab.icon} size={20} color={selectedTab === tab.id ? "white" : "#666"} />
            <Text style={[styles.tabText, selectedTab === tab.id && styles.activeTabText]}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bookings List */}
      <ScrollView
        style={styles.bookingsContainer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredBookings.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            {/* Header */}
            <View style={styles.bookingHeader}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{booking.service}</Text>
                <Text style={styles.bookingDate}>
                  {booking.date} at {booking.time}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + "20" }]}>
                <Icon name={getStatusIcon(booking.status)} size={16} color={getStatusColor(booking.status)} />
                <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Text>
              </View>
            </View>

            {/* Details */}
            <View style={styles.bookingDetails}>
              <View style={styles.detailRow}>
                <Icon name="person" size={16} color="#666" />
                <Text style={styles.detailText}>Mechanic: {booking.mechanic}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="directions-car" size={16} color="#666" />
                <Text style={styles.detailText}>Vehicle: {booking.vehicle}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="location-on" size={16} color="#666" />
                <Text style={styles.detailText}>Location: {booking.location}</Text>
              </View>
              <View style={styles.detailRow}>
                <Icon name="attach-money" size={16} color="#666" />
                <Text style={styles.detailText}>Amount: ${booking.amount.toFixed(2)}</Text>
              </View>
            </View>

            {/* Rating (for completed bookings) */}
            {booking.status === "completed" && booking.rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Your Rating:</Text>
                {renderStars(booking.rating)}
              </View>
            )}

            {/* Actions */}
            <View style={styles.bookingActions}>
              {(booking.status === "confirmed" || booking.status === "pending") && (
                <>
                  <TouchableOpacity style={styles.actionButton} onPress={() => handleReschedule(booking)}>
                    <Icon name="schedule" size={16} color="#2196F3" />
                    <Text style={styles.actionButtonText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={() => handleCancelBooking(booking)}
                  >
                    <Icon name="cancel" size={16} color="#F44336" />
                    <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
              {booking.status === "completed" && !booking.rating && (
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.actionButtonText}>Rate Service</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {filteredBookings.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="event-busy" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>No bookings found</Text>
            <Text style={styles.emptyStateSubtext}>
              {selectedTab === "upcoming" ? "You have no upcoming appointments" : `No ${selectedTab} bookings to show`}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#2196F3",
  },
  tabText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "white",
  },
  bookingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  bookingCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  bookingDate: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  bookingDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  ratingLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: "row",
  },
  bookingActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  cancelButton: {
    backgroundColor: "#ffebee",
  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "500",
    color: "#2196F3",
  },
  cancelButtonText: {
    color: "#F44336",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },
})

export default BookingsScreen


// "use client"

// import { useState, useEffect } from "react"
// import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, RefreshControl } from "react-native"
// import Icon from "react-native-vector-icons/MaterialIcons"
// import axios from 'axios'

// const BookingsScreen = () => {
//   const [refreshing, setRefreshing] = useState(false)
//   const [selectedTab, setSelectedTab] = useState("upcoming")
//   const [bookings, setBookings] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     fetchBookings()
//   }, [])

//   const fetchBookings = async () => {
//     try {
//       setLoading(true)
//       // Replace with your actual server IP
//       const response = await axios.get('http://192.168.1.46:3000/bookings?customer_id=1')
//       setBookings(response.data)
//     } catch (error) {
//       console.error('Error fetching bookings:', error)
//       Alert.alert('Error', 'Failed to load bookings')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const tabs = [
//     { id: "upcoming", name: "Upcoming", icon: "schedule" },
//     { id: "completed", name: "Completed", icon: "check-circle" },
//     { id: "cancelled", name: "Cancelled", icon: "cancel" },
//   ]

//   const onRefresh = async () => {
//     setRefreshing(true)
//     await fetchBookings()
//     setRefreshing(false)
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "pending":
//         return "#FF9800"
//       case "confirmed":
//         return "#4CAF50"
//       case "completed":
//         return "#2196F3"
//       case "cancelled":
//         return "#F44336"
//       default:
//         return "#666"
//     }
//   }

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "pending":
//         return "schedule"
//       case "confirmed":
//         return "check-circle"
//       case "completed":
//         return "done-all"
//       case "cancelled":
//         return "cancel"
//       default:
//         return "help"
//     }
//   }

//   const filteredBookings = bookings.filter((booking) => {
//     if (selectedTab === "upcoming") {
//       return booking.status === "confirmed" || booking.status === "pending"
//     }
//     return booking.status === selectedTab
//   })

//   const handleCancelBooking = async (booking) => {
//     Alert.alert(
//       "Cancel Booking", 
//       `Are you sure you want to cancel your ${booking.service_name} appointment?`, 
//       [
//         { text: "No", style: "cancel" },
//         { 
//           text: "Yes, Cancel", 
//           style: "destructive", 
//           onPress: async () => {
//             try {
//               await axios.delete(`http://192.168.1.46:3000/bookings/${booking.id}`)
//               Alert.alert("Success", "Booking cancelled successfully")
//               fetchBookings() // Refresh the list
//             } catch (error) {
//               Alert.alert("Error", "Failed to cancel booking")
//             }
//           }
//         },
//       ]
//     )
//   }

//   const handleReschedule = (booking) => {
//     Alert.alert("Reschedule", `Reschedule ${booking.service_name} appointment`)
//   }

//   const renderStars = (rating) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(<Icon key={i} name="star" size={16} color={i <= rating ? "#FFD700" : "#ddd"} />)
//     }
//     return <View style={styles.starsContainer}>{stars}</View>
//   }

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <Icon name="hourglass-empty" size={50} color="#ccc" />
//           <Text style={styles.loadingText}>Loading bookings...</Text>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>My Bookings</Text>
//         <Text style={styles.subtitle}>Manage your service appointments</Text>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         {tabs.map((tab) => (
//           <TouchableOpacity
//             key={tab.id}
//             style={[styles.tab, selectedTab === tab.id && styles.activeTab]}
//             onPress={() => setSelectedTab(tab.id)}
//           >
//             <Icon name={tab.icon} size={20} color={selectedTab === tab.id ? "white" : "#666"} />
//             <Text style={[styles.tabText, selectedTab === tab.id && styles.activeTabText]}>{tab.name}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Bookings List */}
//       <ScrollView
//         style={styles.bookingsContainer}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         {filteredBookings.map((booking) => (
//           <View key={booking.id} style={styles.bookingCard}>
//             {/* Header */}
//             <View style={styles.bookingHeader}>
//               <View style={styles.serviceInfo}>
//                 <Text style={styles.serviceName}>{booking.service_name}</Text>
//                 <Text style={styles.bookingDate}>
//                   {booking.booking_date} at {booking.booking_time}
//                 </Text>
//               </View>
//               <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + "20" }]}>
//                 <Icon name={getStatusIcon(booking.status)} size={16} color={getStatusColor(booking.status)} />
//                 <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
//                   {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
//                 </Text>
//               </View>
//             </View>

//             {/* Details */}
//             <View style={styles.bookingDetails}>
//               <View style={styles.detailRow}>
//                 <Icon name="person" size={16} color="#666" />
//                 <Text style={styles.detailText}>Mechanic: {booking.mechanic_name}</Text>
//               </View>
//               <View style={styles.detailRow}>
//                 <Icon name="directions-car" size={16} color="#666" />
//                 <Text style={styles.detailText}>Vehicle: {booking.vehicle_model} ({booking.vehicle_number})</Text>
//               </View>
//               <View style={styles.detailRow}>
//                 <Icon name="build" size={16} color="#666" />
//                 <Text style={styles.detailText}>Specialization: {booking.mechanic_specialization}</Text>
//               </View>
//               <View style={styles.detailRow}>
//                 <Icon name="attach-money" size={16} color="#666" />
//                 <Text style={styles.detailText}>Amount: ${booking.service_price}</Text>
//               </View>
//               <View style={styles.detailRow}>
//                 <Icon name="schedule" size={16} color="#666" />
//                 <Text style={styles.detailText}>Duration: {booking.service_duration}</Text>
//               </View>
//             </View>

//             {/* Rating (for completed bookings) */}
//             {booking.status === "completed" && booking.mechanic_rating && (
//               <View style={styles.ratingContainer}>
//                 <Text style={styles.ratingLabel}>Mechanic Rating:</Text>
//                 {renderStars(Math.floor(booking.mechanic_rating))}
//               </View>
//             )}

//             {/* Actions */}
//             <View style={styles.bookingActions}>
//               {(booking.status === "confirmed" || booking.status === "pending") && (
//                 <>
//                   <TouchableOpacity style={styles.actionButton} onPress={() => handleReschedule(booking)}>
//                     <Icon name="schedule" size={16} color="#2196F3" />
//                     <Text style={styles.actionButtonText}>Reschedule</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[styles.actionButton, styles.cancelButton]}
//                     onPress={() => handleCancelBooking(booking)}
//                   >
//                     <Icon name="cancel" size={16} color="#F44336" />
//                     <Text style={[styles.actionButtonText, styles.cancelButtonText]}>Cancel</Text>
//                   </TouchableOpacity>
//                 </>
//               )}
//             </View>
//           </View>
//         ))}

//         {filteredBookings.length === 0 && (
//           <View style={styles.emptyState}>
//             <Icon name="event-busy" size={60} color="#ccc" />
//             <Text style={styles.emptyStateText}>No bookings found</Text>
//             <Text style={styles.emptyStateSubtext}>
//               {selectedTab === "upcoming" ? "You have no upcoming appointments" : `No ${selectedTab} bookings to show`}
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     padding: 20,
//     backgroundColor: "white",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 5,
//   },
//   tabsContainer: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   tab: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     marginHorizontal: 5,
//   },
//   activeTab: {
//     backgroundColor: "#2196F3",
//   },
//   tabText: {
//     marginLeft: 5,
//     fontSize: 14,
//     fontWeight: "500",
//     color: "#666",
//   },
//   activeTabText: {
//     color: "white",
//   },
//   bookingsContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//   },
//   bookingCard: {
//     backgroundColor: "white",
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 15,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//   },
//   bookingHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: 15,
//   },
//   serviceInfo: {
//     flex: 1,
//   },
//   serviceName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 5,
//   },
//   bookingDate: {
//     fontSize: 14,
//     color: "#666",
//   },
//   statusBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 15,
//   },
//   statusText: {
//     marginLeft: 5,
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   bookingDetails: {
//     marginBottom: 15,
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   detailText: {
//     marginLeft: 10,
//     fontSize: 14,
//     color: "#666",
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   ratingLabel: {
//     fontSize: 14,
//     color: "#666",
//     marginRight: 10,
//   },
//   starsContainer: {
//     flexDirection: "row",
//   },
//   bookingActions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//   },
//   actionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#f0f0f0",
//   },
//   cancelButton: {
//     backgroundColor: "#ffebee",
//   },
//   actionButtonText: {
//     marginLeft: 5,
//     fontSize: 12,
//     fontWeight: "500",
//     color: "#2196F3",
//   },
//   cancelButtonText: {
//     color: "#F44336",
//   },
//   emptyState: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 60,
//   },
//   emptyStateText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#666",
//     marginTop: 20,
//   },
//   emptyStateSubtext: {
//     fontSize: 14,
//     color: "#999",
//     marginTop: 10,
//     textAlign: "center",
//   },
// })

// // // Add the loading styles to your existing styles
// // const styles = StyleSheet.create({
// //   // ... all your existing styles, plus these new ones:
  
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   loadingText: {
// //     fontSize: 16,
// //     color: '#666',
// //     marginTop: 15,
// //   },
// // })

// export default BookingsScreen