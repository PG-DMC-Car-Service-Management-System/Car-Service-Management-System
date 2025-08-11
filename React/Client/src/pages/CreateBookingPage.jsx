import React from "react"
import { apiGet, apiPost } from "../api.js"
import { useNavigate } from "react-router-dom"

export default function CreateBookingPage() {
  const nav = useNavigate()
  const [customers, setCustomers] = React.useState([])
  const [services, setServices] = React.useState([])
  const [form, setForm] = React.useState({
    customer_id: "", service_id: "", service_type: "",
    vehicle_no: "", vehicle_model: "", booking_date: "", status: "Pending"
  })

  React.useEffect(() => {
    Promise.all([apiGet("/customers"), apiGet("/services")]).then(([c, s]) => {
      setCustomers(c); setServices(s)
    })
  }, [])

  async function submit(e) {
    e.preventDefault()
    await apiPost("/bookings", {
      ...form,
      customer_id: Number(form.customer_id),
      service_id: Number(form.service_id),
    })
    nav("/bookings")
  }

  return (
    <div className="stack">
      <h1>New Booking</h1>
      <div className="card">
        <form className="row" onSubmit={submit}>
          <div className="stack">
            <label>Customer</label>
            <select value={form.customer_id} onChange={e => setForm({ ...form, customer_id: e.target.value })}>
              <option value="">Select customer</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}
            </select>

            <label>Service</label>
            <select value={form.service_id} onChange={e => setForm({ ...form, service_id: e.target.value })}>
              <option value="">Select service</option>
              {services.map(s => <option key={s.id} value={s.id}>{s.service}</option>)}
            </select>

            <label>Service Type</label>
            <input className="input" value={form.service_type} onChange={e => setForm({ ...form, service_type: e.target.value })} />

            <label>Booking Date</label>
            <input className="input" type="date" value={form.booking_date} onChange={e => setForm({ ...form, booking_date: e.target.value })} />
          </div>

          <div className="stack">
            <label>Vehicle No</label>
            <input className="input" value={form.vehicle_no} onChange={e => setForm({ ...form, vehicle_no: e.target.value })} />

            <label>Vehicle Model</label>
            <input className="input" value={form.vehicle_model} onChange={e => setForm({ ...form, vehicle_model: e.target.value })} />

            <label>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Completed</option>
            </select>

            <button className="btn primary" style={{ marginTop: 28 }} type="submit">Create Booking</button>
          </div>
        </form>
      </div>
    </div>
  )
}