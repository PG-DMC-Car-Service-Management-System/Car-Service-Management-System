import React from "react"
import { apiGet, apiDelete } from "../api.js"

export default function BookingsPage() {
  const [bookings, setBookings] = React.useState([])

  async function load() {
    const data = await apiGet("/bookings")
    setBookings(data)
  }
  React.useEffect(() => { load() }, [])

  async function remove(id) {
    if (!confirm("Delete booking?")) return
    await apiDelete(`/bookings/${id}`)
    load()
  }

  return (
    <div className="stack">
      <h1>Bookings</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Customer</th><th>Service</th><th>Type</th><th>Vehicle</th><th>Date</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.customer_name || b.customer_id}</td>
                <td>{b.service_name || b.service_id}</td>
                <td>{b.service_type}</td>
                <td>{b.vehicle_model} ({b.vehicle_no})</td>
                <td>{b.booking_date?.slice(0, 10)}</td>
                <td>{b.status}</td>
                <td><button className="btn danger" onClick={() => remove(b.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}