import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Share } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

const BookingConfirmationScreen = ({ navigation, route }) => {
  const { booking } = route.params

  const shareBookingDetails = async () => {
    try {
      const message =
        `🚗 Vehicle Service Booking Confirmed!\n\n` +
        `Booking ID: ${booking.bookingId}\n` +
        `Service: ${booking.service.name}\n` +
        `Vehicle: ${booking.vehicle.model}\n` +
        `Date: ${booking.date} at ${booking.time}\n` +
        `Mechanic: ${booking.mechanic.name}\n` +
        `Amount: ₹${booking.amount.toFixed(2)}\n\n` +
        `Thank you for choosing our service!`

      await Share.share({
        message: message,
        title: "Booking Confirmation",
      })
    } catch (error) {
      console.log("Error sharing:", error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Success Animation */}
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Icon name="check-circle" size={80} color="#4CAF50" />
          </View>
          <Text style={styles.successTitle}>Booking Confirmed!</Text>
          <Text style={styles.successSubtitle}>Your service has been successfully booked</Text>
        </View>

        {/* Booking Details Card */}
        <View style={styles.detailsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Booking Details</Text>
            <TouchableOpacity onPress={shareBookingDetails}>
              <Icon name="share" size={24} color="#2196F3" />
            </TouchableOpacity>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="confirmation-number" size={20} color="#2196F3" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Booking ID</Text>
              <Text style={styles.detailValue}>{booking.bookingId}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="build" size={20} color="#2196F3" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>{booking.service.name}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="directions-car" size={20} color="#2196F3" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Vehicle</Text>
              <Text style={styles.detailValue}>{booking.vehicle.model}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="person" size={20} color="#2196F3" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Mechanic</Text>
              <Text style={styles.detailValue}>{booking.mechanic.name}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="schedule" size={20} color="#2196F3" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Date & Time</Text>
              <Text style={styles.detailValue}>
                {booking.date} at {booking.time}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="payment" size={20} color="#2196F3" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Amount Paid</Text>
              <Text style={[styles.detailValue, styles.amountText]}>${booking.amount.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Icon name="receipt" size={20} color="#2196F3" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Transaction ID</Text>
              <Text style={styles.detailValue}>{booking.transactionId}</Text>
            </View>
          </View>
        </View>

        {/* What's Next Card */}
        <View style={styles.nextStepsCard}>
          <Text style={styles.cardTitle}>What's Next?</Text>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Confirmation SMS/Email</Text>
              <Text style={styles.stepDescription}>You'll receive a confirmation message shortly with all details</Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Pre-Service Call</Text>
              <Text style={styles.stepDescription}>Our team will contact you 1 day before the service</Text>
            </View>
          </View>

          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Service Day</Text>
              <Text style={styles.stepDescription}>Bring your vehicle to our service center on the scheduled date</Text>
            </View>
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.notesCard}>
          <View style={styles.notesHeader}>
            <Icon name="info" size={20} color="#FF9800" />
            <Text style={styles.notesTitle}>Important Notes</Text>
          </View>
          <Text style={styles.notesText}>
            • Please arrive 15 minutes before your scheduled time{"\n"}• Bring your vehicle registration and insurance
            documents{"\n"}• Keep your booking ID handy for reference{"\n"}• Contact us if you need to reschedule or
            cancel
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("CustomerMain", { screen: "Dashboard" })}
          >
            <Icon name="dashboard" size={20} color="white" />
            <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("CustomerMain", { screen: "History" })}
          >
            <Icon name="history" size={20} color="#2196F3" />
            <Text style={styles.secondaryButtonText}>View Service History</Text>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Need Help?</Text>
          <View style={styles.supportButtons}>
            <TouchableOpacity style={styles.supportButton}>
              <Icon name="phone" size={20} color="#4CAF50" />
              <Text style={styles.supportButtonText}>Call Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportButton}>
              <Icon name="chat" size={20} color="#2196F3" />
              <Text style={styles.supportButtonText}>Live Chat</Text>
            </TouchableOpacity>
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
  successContainer: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  detailsCard: {
    backgroundColor: "white",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  amountText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  nextStepsCard: {
    backgroundColor: "white",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  stepNumberText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  notesCard: {
    backgroundColor: "#FFF8E1",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  notesText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  buttonContainer: {
    margin: 20,
    marginTop: 0,
  },
  primaryButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    elevation: 3,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  secondaryButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#2196F3",
    elevation: 2,
  },
  secondaryButtonText: {
    color: "#2196F3",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  supportSection: {
    margin: 20,
    marginTop: 0,
    alignItems: "center",
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  supportButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2,
  },
  supportButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
})

export default BookingConfirmationScreen
