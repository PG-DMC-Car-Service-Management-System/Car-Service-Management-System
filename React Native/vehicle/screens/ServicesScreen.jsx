// "use client"

// import { useState } from "react"
// import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert } from "react-native"
// import Icon from "react-native-vector-icons/MaterialIcons"

// const ServicesScreen = () => {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedCategory, setSelectedCategory] = useState("all")

//   const categories = [
//     { id: "all", name: "All Services", icon: "list" },
//     { id: "maintenance", name: "Maintenance", icon: "build" },
//     { id: "repair", name: "Repair", icon: "construction" },
//     { id: "inspection", name: "Inspection", icon: "search" },
//   ]

//   const services = [
//     {
//       id: 1,
//       name: "Oil Change",
//       description: "Complete oil change with filter replacement",
//       price:  2550.0,
//       duration: "30 mins",
//       category: "maintenance",
//       icon: "local-gas-station",
//       rating: 4.8,
//     },
//     {
//       id: 2,
//       name: "Brake Service",
//       description: "Brake inspection and pad replacement",
//       price: 5250.0,
//       duration: "2 hours",
//       category: "repair",
//       icon: "pan-tool",
//       rating: 4.9,
//     },
//     {
//       id: 3,
//       name: "Engine Tune-up",
//       description: "Complete engine maintenance and optimization",
//       price: 6280.0,
//       duration: "3 hours",
//       category: "maintenance",
//       icon: "settings",
//       rating: 4.7,
//     },
//     {
//       id: 4,
//       name: "Tire Rotation",
//       description: "Professional tire rotation and balancing",
//       price: 5350.0,
//       duration: "45 mins",
//       category: "maintenance",
//       icon: "trip-origin",
//       rating: 4.6,
//     },
//     {
//       id: 5,
//       name: "Battery Check",
//       description: "Battery health assessment and replacement",
//       price: 2850.0,
//       duration: "20 mins",
//       category: "inspection",
//       icon: "battery-charging-full",
//       rating: 4.5,
//     },
//     {
//       id: 6,
//       name: "AC Service",
//       description: "Air conditioning system maintenance",
//       price: 8650.0,
//       duration: "1.5 hours",
//       category: "repair",
//       icon: "ac-unit",
//       rating: 4.8,
//     },
//   ]

//   const filteredServices = services.filter((service) => {
//     const matchesSearch =
//       service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       service.description.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
//     return matchesSearch && matchesCategory
//   })

//   const handleBookService = (service) => {
//     Alert.alert("Book Service", `Would you like to book ${service.name} for ₹${service.price}?`, [
//       { text: "Cancel", style: "cancel" },
//       { text: "Book Now", onPress: () => console.log("Booking:", service.name) },
//     ])
//   }

//   const renderStars = (rating) => {
//     const stars = []
//     const fullStars = Math.floor(rating)
//     const hasHalfStar = rating % 1 !== 0

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Icon key={i} name="star" size={16} color="#FFD700" />)
//     }

//     if (hasHalfStar) {
//       stars.push(<Icon key="half" name="star-half" size={16} color="#FFD700" />)
//     }

//     return <View style={styles.starsContainer}>{stars}</View>
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Our Services</Text>
//         <Text style={styles.subtitle}>Choose from our professional services</Text>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Icon name="search" size={20} color="#666" />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search services..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       {/* Category Filter */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
//         {categories.map((category) => (
//           <TouchableOpacity
//             key={category.id}
//             style={[styles.categoryChip, selectedCategory === category.id && styles.activeCategoryChip]}
//             onPress={() => setSelectedCategory(category.id)}
//           >
//             <Icon name={category.icon} size={16} color={selectedCategory === category.id ? "white" : "#666"} />
//             <Text style={[styles.categoryText, selectedCategory === category.id && styles.activeCategoryText]}>
//               {category.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Services List */}
//       <ScrollView style={styles.servicesContainer}>
//         {filteredServices.map((service) => (
//           <View key={service.id} style={styles.serviceCard}>
//             <View style={styles.serviceHeader}>
//               <View style={styles.serviceIconContainer}>
//                 <Icon name={service.icon} size={24} color="#2196F3" />
//               </View>
//               <View style={styles.serviceInfo}>
//                 <Text style={styles.serviceName}>{service.name}</Text>
//                 <Text style={styles.serviceDescription}>{service.description}</Text>
//                 <View style={styles.serviceDetails}>
//                   <View style={styles.ratingContainer}>
//                     {renderStars(service.rating)}
//                     <Text style={styles.ratingText}>({service.rating})</Text>
//                   </View>
//                   <Text style={styles.serviceDuration}>• {service.duration}</Text>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.serviceFooter}>
//               <Text style={styles.servicePrice}>₹{service.price.toFixed(2)}</Text>
//               <TouchableOpacity style={styles.bookButton} onPress={() => handleBookService(service)}>
//                 <Text style={styles.bookButtonText}>Book Now</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}

//         {filteredServices.length === 0 && (
//           <View style={styles.emptyState}>
//             <Icon name="search-off" size={60} color="#ccc" />
//             <Text style={styles.emptyStateText}>No services found</Text>
//             <Text style={styles.emptyStateSubtext}>Try adjusting your search or filter</Text>
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5"
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
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     margin: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 15,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 16,
//     color: "#333",
//   },
//   categoriesContainer: {
//     paddingHorizontal: 20,
//     marginBottom: 10,
//     maxHeight:53
//   },
//   categoryChip: {
//     flexDirection: "row",
//     alignItems:"center",
//     backgroundColor: "white",
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     height:50,
//     borderRadius: 20,
//     marginRight: 10,
//     elevation: 1,
//   },
//   activeCategoryChip: {
//     backgroundColor: "#2196F3",
//   },
//   categoryText: {
//     marginLeft: 5,
//     fontSize: 14,
//     color: "#666",
//     fontWeight: "500",
//   },
//   activeCategoryText: {
//     color: "white",
//   },
//   servicesContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   serviceCard: {
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
//   serviceHeader: {
//     flexDirection: "row",
//     marginBottom: 15,
//   },
//   serviceIconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#E3F2FD",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 15,
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
//   serviceDescription: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 8,
//   },
//   serviceDetails: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   starsContainer: {
//     flexDirection: "row",
//   },
//   ratingText: {
//     marginLeft: 5,
//     fontSize: 12,
//     color: "#666",
//   },
//   serviceDuration: {
//     fontSize: 12,
//     color: "#666",
//     marginLeft: 10,
//   },
//   serviceFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   servicePrice: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#4CAF50",
//   },
//   bookButton: {
//     backgroundColor: "#2196F3",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 20,
//   },
//   bookButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 14,
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

// export default ServicesScreen


"use client"

import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import axios from "axios"

const ServicesScreen = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  const categories = [
    { id: "all", name: "All Services", icon: "list" },
    { id: "maintenance", name: "Maintenance", icon: "build" },
    { id: "repair", name: "Repair", icon: "construction" },
    { id: "inspection", name: "Inspection", icon: "search" },
  ]
  

  useEffect(() => {
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://192.168.1.44:3000/services');
      console.log("Services from backend:", response.data);  
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);


  const handleBookService = (service) => {
    navigation.navigate('HomeStack', {
      screen: 'BookService',
      params: { service }
    });
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="star" size={16} color="#FFD700" />)
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star-half" size={16} color="#FFD700" />)
    }

    return <View style={styles.starsContainer}>{stars}</View>
  }
  

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Our Services</Text>
        <Text style={styles.subtitle}>Choose from our professional services</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryChip, selectedCategory === category.id && styles.activeCategoryChip]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Icon name={category.icon} size={16} color={selectedCategory === category.id ? "white" : "#666"} />
            <Text style={[styles.categoryText, selectedCategory === category.id && styles.activeCategoryText]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      

      {/* Services List */}
      <ScrollView style={styles.servicesContainer}>
        {filteredServices.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceIconContainer}>
                <Icon name={service.icon} size={24} color="#2196F3" />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <View style={styles.serviceDetails}>
                  <View style={styles.ratingContainer}>
                    {renderStars(service.rating)}
                    <Text style={styles.ratingText}>({service.rating})</Text>
                  </View>
                  <Text style={styles.serviceDuration}>• {service.duration}</Text>
                </View>
              </View>
            </View>

            <View style={styles.serviceFooter}>
              {/* <Text style={styles.servicePrice}>₹{service.price.toFixed(2)}</Text> */}
              <Text style={styles.servicePrice}>₹{service.price}</Text>
              <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate("BookService", { service: service })}>
              <Text style={styles.bookButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}


        {filteredServices.length === 0 && (
          <View style={styles.emptyState}>
            <Icon name="search-off" size={60} color="#ccc" />
            <Text style={styles.emptyStateText}>No services found</Text>
            <Text style={styles.emptyStateSubtext}>Try adjusting your search or filter</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  header: {
    padding: 20,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
    maxHeight: 53,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 8,
    height: 50,
    borderRadius: 20,
    marginRight: 10,
    elevation: 1,
  },
  activeCategoryChip: {
    backgroundColor: "#2196F3",
  },
  categoryText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "white",
  },
  servicesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  serviceHeader: {
    flexDirection: "row",
    marginBottom: 15,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
  },
  serviceDuration: {
    fontSize: 12,
    color: "#666",
    marginLeft: 10,
  },
  serviceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  bookButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bookButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
})

export default ServicesScreen

