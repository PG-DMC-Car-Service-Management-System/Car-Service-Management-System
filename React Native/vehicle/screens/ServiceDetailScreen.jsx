"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Share, Alert, Linking } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const ServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params
  const [showInvoice, setShowInvoice] = useState(false)

  const serviceDetails = {
    ...service,
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    partsUsed: [
      { name: "Engine Oil (5W-30)", quantity: "4 liters", price: 25.0 },
      { name: "Oil Filter", quantity: "1 piece", price: 15.0 },
      { name: "Labor Charges", quantity: "1 hour", price: 15.0 },
    ],
    technicianNotes:
      "Oil change completed successfully. Vehicle inspected for leaks and proper oil level. All systems functioning normally. Recommended next oil change in 5,000 miles or 6 months.",
    warrantyInfo: "6 months or 5,000 miles warranty on parts and labor",
    invoiceNumber: "INV-" + service.bookingId,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
  }

  const subtotal = serviceDetails.partsUsed.reduce((sum, part) => sum + part.price, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon key={star} name="star" size={20} color={star <= rating ? "#FFD700" : "#ddd"} />
        ))}
      </View>
    )
  }

  const shareServiceDetails = async () => {
    try {
      const message =
        `🔧 Service Details\n\n` +
        `Service: ${service.service}\n` +
        `Date: ${service.date}\n` +
        `Vehicle: ${service.vehicle}\n` +
        `Mechanic: ${service.mechanic}\n` +
        `Status: ${service.status}\n` +
        `Amount: ₹${service.amount.toFixed(2)}\n` +
        `Booking ID: ${service.bookingId}\n\n` +
        `Vehicle Service Management System`

      await Share.share({
        message: message,
        title: "Service Details",
      })
    } catch (error) {
      console.log("Error sharing:", error)
    }
  }

  const downloadInvoice = () => {
    Alert.alert("Download Invoice", "Invoice will be downloaded to your device", [
      { text: "Cancel", style: "cancel" },
      { text: "Download", onPress: () => console.log("Downloading invoice...") },
    ])
  }

  const contactSupport = () => {
    Alert.alert("Contact Support", "How would you like to contact us?", [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => Linking.openURL("tel:+1234567890") },
      { text: "Email", onPress: () => Linking.openURL("mailto:support@vehicleservice.com") },
    ])
  }

  const bookAgain = () => {
    navigation.navigate("Book Service")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View style={styles.serviceIconContainer}>
              <Icon name="build" size={30} color="#2196F3" />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.serviceName}>{service.service}</Text>
              <Text style={styles.bookingId}>#{service.bookingId}</Text>
            </View>
            <TouchableOpacity onPress={shareServiceDetails}>
              <Icon name="share" size={24} color="#2196F3" />
            </TouchableOpacity>
          </View>

          <View style={styles.statusContainer}>
            <View
              style={[styles.statusBadge, { backgroundColor: service.status === "Completed" ? "#4CAF50" : "#FF9800" }]}
            >
              <Icon name={service.status === "Completed" ? "check-circle" : "schedule"} size={16} color="white" />
              <Text style={styles.statusText}>{service.status}</Text>
            </View>
          </View>
        </View>

        {/* Service Information */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Service Information</Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="directions-car" size={20} color="#2196F3" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Vehicle</Text>
              <Text style={styles.infoValue}>{service.vehicle}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="calendar-today" size={20} color="#2196F3" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Service Date</Text>
              <Text style={styles.infoValue}>{service.date}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="schedule" size={20} color="#2196F3" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>
                {serviceDetails.startTime} - {serviceDetails.endTime}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Icon name="person" size={20} color="#2196F3" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Mechanic</Text>
              <Text style={styles.infoValue}>{service.mechanic}</Text>
            </View>
          </View>
        </View>

        {/* Parts & Labor */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Parts & Labor Details</Text>

          {serviceDetails.partsUsed.map((part, index) => (
            <View key={index} style={styles.partRow}>
              <View style={styles.partInfo}>
                <Text style={styles.partName}>{part.name}</Text>
                <Text style={styles.partQuantity}>{part.quantity}</Text>
              </View>
              <Text style={styles.partPrice}>${part.price.toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (10%)</Text>
            <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
          </View>

          <View style={[styles.totalRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Technician Notes */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Technician Notes</Text>
          <Text style={styles.notesText}>{serviceDetails.technicianNotes}</Text>

          {serviceDetails.warrantyInfo && (
            <View style={styles.warrantyContainer}>
              <Icon name="verified" size={20} color="#4CAF50" />
              <Text style={styles.warrantyText}>{serviceDetails.warrantyInfo}</Text>
            </View>
          )}
        </View>

        {/* Rating & Feedback */}
        {service.status === "Completed" && (
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Your Rating & Feedback</Text>

            {service.rating ? (
              <View>
                <View style={styles.ratingDisplay}>
                  <Text style={styles.ratingLabel}>Rating:</Text>
                  {renderStars(service.rating)}
                  <Text style={styles.ratingText}>({service.rating}/5)</Text>
                </View>

                {service.feedback && (
                  <View style={styles.feedbackContainer}>
                    <Text style={styles.feedbackLabel}>Your Feedback:</Text>
                    <Text style={styles.feedbackText}>"{service.feedback}"</Text>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.noRatingContainer}>
                <Icon name="star-border" size={40} color="#ccc" />
                <Text style={styles.noRatingText}>No rating provided yet</Text>
                <TouchableOpacity style={styles.addRatingButton}>
                  <Text style={styles.addRatingText}>Add Rating & Feedback</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Invoice Section */}
        <View style={styles.infoCard}>
          <TouchableOpacity style={styles.invoiceHeader} onPress={() => setShowInvoice(!showInvoice)}>
            <Text style={styles.cardTitle}>Invoice Details</Text>
            <Icon name={showInvoice ? "expand-less" : "expand-more"} size={24} color="#666" />
          </TouchableOpacity>

          {showInvoice && (
            <View style={styles.invoiceContent}>
              <View style={styles.invoiceRow}>
                <Text style={styles.invoiceLabel}>Invoice Number:</Text>
                <Text style={styles.invoiceValue}>{serviceDetails.invoiceNumber}</Text>
              </View>

              <View style={styles.invoiceRow}>
                <Text style={styles.invoiceLabel}>Payment Status:</Text>
                <Text style={[styles.invoiceValue, styles.paidStatus]}>{serviceDetails.paymentStatus}</Text>
              </View>

              <View style={styles.invoiceRow}>
                <Text style={styles.invoiceLabel}>Payment Method:</Text>
                <Text style={styles.invoiceValue}>{serviceDetails.paymentMethod}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Next Service Reminder */}
        {service.nextServiceDue && (
          <View style={styles.reminderCard}>
            <View style={styles.reminderHeader}>
              <Icon name="event" size={24} color="#FF9800" />
              <Text style={styles.reminderTitle}>Next Service Reminder</Text>
            </View>
            <Text style={styles.reminderText}>Your next service is due on {service.nextServiceDue}</Text>
            <TouchableOpacity style={styles.scheduleButton}>
              <Text style={styles.scheduleButtonText}>Schedule Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton} onPress={downloadInvoice}>
            <Icon name="file-download" size={20} color="#2196F3" />
            <Text style={styles.actionButtonText}>Download Invoice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={bookAgain}>
            <Icon name="repeat" size={20} color="#2196F3" />
            <Text style={styles.actionButtonText}>Book Same Service</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={contactSupport}>
            <Icon name="support-agent" size={20} color="#2196F3" />
            <Text style={styles.actionButtonText}>Contact Support</Text>
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
  headerCard: {
    backgroundColor: "white",
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  bookingId: {
    fontSize: 14,
    color: "#666",
  },
  statusContainer: {
    alignItems: "flex-start",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  infoCard: {
    backgroundColor: "white",
    margin: 20,
    marginBottom: 0,
    padding: 20,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  partRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
  },
  partInfo: {
    flex: 1,
  },
  partName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  partQuantity: {
    fontSize: 12,
    color: "#666",
  },
  partPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    marginTop: 5,
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
  },
  notesText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 15,
  },
  warrantyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E8",
    padding: 12,
    borderRadius: 10,
  },
  warrantyText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#4CAF50",
    flex: 1,
    fontWeight: "500",
  },
  ratingDisplay: {
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
    marginRight: 10,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },
  feedbackContainer: {
    marginTop: 10,
  },
  feedbackLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    color: "#333",
    fontStyle: "italic",
    lineHeight: 20,
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
  },
  noRatingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noRatingText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 15,
  },
  addRatingButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addRatingText: {
    color: "white",
    fontWeight: "bold",
  },
  invoiceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invoiceContent: {
    marginTop: 15,
  },
  invoiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  invoiceLabel: {
    fontSize: 14,
    color: "#666",
  },
  invoiceValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  paidStatus: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  reminderCard: {
    backgroundColor: "#FFF8E1",
    margin: 20,
    marginBottom: 0,
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  reminderText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
    lineHeight: 20,
  },
  scheduleButton: {
    backgroundColor: "#FF9800",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  scheduleButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  actionSection: {
    margin: 20,
    marginBottom: 40,
  },
  actionButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "500",
    color: "#2196F3",
  },
})

export default ServiceDetailScreen
