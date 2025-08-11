import React from "react"
import { apiGet, apiPost, apiPut, apiDelete } from "../api.js"

export default function BillingPage() {
  const [bills, setBills] = React.useState([])
  const [bookings, setBookings] = React.useState([])
  const [form, setForm] = React.useState({ booking_id: "", amount: "", bill_date: "" })
  const [edit, setEdit] = React.useState(null)

  async function load() {
    const [b, bk] = await Promise.all([apiGet("/billing"), apiGet("/bookings")])
    setBills(b)
    setBookings(bk)
  }
  React.useEffect(() => { load() }, [])

  async function submit(e) {
    e.preventDefault()
    await apiPost("/billing", { booking_id: Number(form.booking_id), amount: Number(form.amount), bill_date: form.bill_date })
    setForm({ booking_id: "", amount: "", bill_date: "" })
    load()
  }

  function startEdit(row) {
    setEdit(row.bill_id)
    setForm({ booking_id: row.booking_id, amount: row.amount, bill_date: row.bill_date?.slice(0, 10) || "" })
  }

  async function saveEdit(e) {
    e.preventDefault()
    await apiPut(`/billing/${edit}`, { booking_id: Number(form.booking_id), amount: Number(form.amount), bill_date: form.bill_date })
    setEdit(null)
    setForm({ booking_id: "", amount: "", bill_date: "" })
    load()
  }

  async function remove(id) {
    if (!confirm("Delete bill?")) return
    await apiDelete(`/billing/${id}`)
    load()
  }

  return (
    <div className="stack">
      <h1>Billing</h1>

      <div className="card">
        <form className="row" onSubmit={edit ? saveEdit : submit}>
          <div className="stack">
            <label>Booking</label>
            <select value={form.booking_id} onChange={e => setForm({ ...form, booking_id: e.target.value })}>
              <option value="">Select booking</option>
              {bookings.map(b => (
                <option key={b.id} value={b.id}>
                  #{b.id} - {b.customer_name || b.customer_id} - {b.service_name || b.service_id}
                </option>
              ))}
            </select>
            <label>Amount</label>
            <input className="input" type="number" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div className="stack">
            <label>Bill Date</label>
            <input className="input" type="date" value={form.bill_date} onChange={e => setForm({ ...form, bill_date: e.target.value })} />
            <div>
              <button className="btn primary" style={{ marginTop: 28 }} type="submit">{edit ? "Save" : "Add Bill"}</button>
              {edit && <button className="btn" style={{ marginTop: 28, marginLeft: 8 }} type="button" onClick={() => { setEdit(null); setForm({ booking_id: "", amount: "", bill_date: "" }) }}>Cancel</button>}
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Booking</th><th>Amount</th><th>Date</th><th></th></tr>
          </thead>
          <tbody>
            {bills.map(r => (
              <tr key={r.bill_id}>
                <td>{r.bill_id}</td>
                <td>#{r.booking_id}</td>
                <td>${Number(r.amount).toFixed(2)}</td>
                <td>{r.bill_date?.slice(0, 10)}</td>
                <td>
                  <button className="btn" onClick={() => startEdit(r)}>Edit</button>{" "}
                  <button className="btn danger" onClick={() => remove(r.bill_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}