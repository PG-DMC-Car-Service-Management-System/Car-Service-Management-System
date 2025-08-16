"use client"

import { useState } from "react"

const AdminDashboardScreen = ({ navigation }) => {
  const [showAddService, setShowAddService] = useState(false);
  const [showAddMechanic, setShowAddMechanic] = useState(false);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const [newMechanic, setNewMechanic] = useState({ name: '', contact: '', email: '', specialization: '' });

  const [stats] = useState({
    totalBookings: 156,
    pendingBookings: 23,
    completedBookings: 120,
    totalRevenue: 15420.50,
    activeCustomers: 89,
    totalMechanics: 12
  });

  const [recentBookings] = useState([
    {
      id: 1,
      customer: 'Reddy',
      service: 'Oil Change',
      vehicle: 'Honda Civic',
      date: '2024-02-15',
      status: 'Pending',
      amount: 55.00
    },
    {
      id: 2,
      customer: 'Aditya Gokhale',
      service: 'Engine Tune Up',
      vehicle: 'Toyota Camry',
      date: '2024-02-14',
      status: 'Completed',
      amount: 165.00
    },
    {
      id: 3,
      customer: 'Dip Chafale',
      service: 'Tyre Replacement',
      vehicle: 'BMW X5',
      date: '2024-02-13',
      status: 'In Progress',
      amount: 220.00
    }
]);

  const adminActions = [
    {
      title: 'Manage Bookings',
      icon: 'event-note',
      color: '#2196F3',
      count: stats.pendingBookings,
      onPress: () => {}
    },
    {
      title: 'Manage Services',
      icon: 'build',
      color: '#4CAF50',
      count: '8',
      onPress: () => setShowAddService(true)
    },
    {
      title: 'Manage Mechanics',
      icon: 'people',
      color: '#FF9800',
      count: stats.totalMechanics,
      onPress: () => setShowAddMechanic(true)
    },
    {
      title: 'Customer Reports',
      icon: 'assessment',
      color: '#9C27B0',
      count: stats.activeCustomers,
      onPress: () => {}
    },
    {
      title: 'Revenue Reports',
      icon: 'attach-money',
      color: '#00BCD4',
      count: `₹${stats.totalRevenue}`,
      onPress: () => {}
    },
    {
      title: 'Feedback Management',
      icon: 'star',
      color: '#FFC107',
      count: '4.8',
      onPress: () => {}
    }
  ]}
