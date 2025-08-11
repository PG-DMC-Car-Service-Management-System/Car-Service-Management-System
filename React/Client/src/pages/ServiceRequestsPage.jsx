import React from "react"
import { apiGet, apiPost, apiPut, apiDelete } from "../api.js"

export default function ServiceRequestsPage() {
  const [rows, setRows] = React.useState([])
  const [cats, setCats] = React.useState([])
  const [mechs, setMechs] = React.useState([])
  const [form, setForm] = React.useState({ owner_name: "", category_id: "", service_type: "", mechanic_id: "", status: 0 })
  const [edit, setEdit] = React.useState(null)

  async function load() {
    const [r, c, m] = await Promise.all([
      apiGet("/service-requests"),
      apiGet("/categories"),
      apiGet("/mechanics")
    ])
    setRows(r)
    setCats(c)
    setMechs(m)
  }
  React.useEffect(() => { load() }, [])

  async function submit(e) {
    e.preventDefault()
    await apiPost("/service-requests", {
      owner_name: form.owner_name,
      category_id: form.category_id ? Number(form.category_id) : null,
      service_type: form.service_type,
      mechanic_id: form.mechanic_id ? Number(form.mechanic_id) : null,
      status: Number(form.status)
    })
    setForm({ owner_name: "", category_id: "", service_type: "", mechanic_id: "", status: 0 })
    load()
  }

  function startEdit(row) {
    setEdit(row.id)
    setForm({
      owner_name: row.owner_name || "",
      category_id: row.category_id || "",
      service_type: row.service_type || "",
      mechanic_id: row.mechanic_id || "",
      status: Number(row.status) || 0
    })
  }

  async function saveEdit(e) {
    e.preventDefault()
    await apiPut(`/service-requests/${edit}`, {
      owner_name: form.owner_name,
      category_id: form.category_id ? Number(form.category_id) : null,
      service_type: form.service_type,
      mechanic_id: form.mechanic_id ? Number(form.mechanic_id) : null,
      status: Number(form.status)
    })
    setEdit(null)
    setForm({ owner_name: "", category_id: "", service_type: "", mechanic_id: "", status: 0 })
    load()
  }

  async function toggleStatus(row) {
    await apiPut(`/service-requests/${row.id}`, {
      owner_name: row.owner_name,
      category_id: row.category_id,
      service_type: row.service_type,
      mechanic_id: row.mechanic_id,
      status: Number(row.status) === 1 ? 0 : 1
    })
    load()
  }

  async function remove(id) {
    if (!confirm("Delete service request?")) return
    await apiDelete(`/service-requests/${id}`)
    load()
  }

  return (
    <div className="stack">
      <h1>Service Requests</h1>

      <div className="card">
        <form className="row" onSubmit={edit ? saveEdit : submit}>
          <div className="stack">
            <label>Owner Name</label>
            <input className="input" value={form.owner_name} onChange={e => setForm({ ...form, owner_name: e.target.value })} />
            <label>Category</label>
            <select value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
              <option value="">No category</option>
              {cats.map(c => <option key={c.id} value={c.id}>{c.category}</option>)}
            </select>
          </div>
          <div className="stack">
            <label>Service Type</label>
            <input className="input" value={form.service_type} onChange={e => setForm({ ...form, service_type: e.target.value })} />
            <label>Mechanic</label>
            <select value={form.mechanic_id} onChange={e => setForm({ ...form, mechanic_id: e.target.value })}>
              <option value="">Unassigned</option>
              {mechs.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
            <label>Status</label>
            <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value={0}>Open</option>
              <option value={1}>Closed</option>
            </select>
            <div>
              <button className="btn primary" style={{ marginTop: 8 }} type="submit">{edit ? "Save" : "Create"}</button>
              {edit && (
                <button
                  className="btn"
                  style={{ marginTop: 8, marginLeft: 8 }}
                  type="button"
                  onClick={() => {
                    setEdit(null)
                    setForm({ owner_name: "", category_id: "", service_type: "", mechanic_id: "", status: 0 })
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner</th>
              <th>Category</th>
              <th>Mechanic</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.owner_name}</td>
                <td>{r.category_name || "-"}</td>
                <td>{r.mechanic_name || "-"}</td>
                <td>{r.service_type}</td>
                <td>
                  <button className="btn small" onClick={() => toggleStatus(r)}>
                    {Number(r.status) === 1 ? "Closed" : "Open"}
                  </button>
                </td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn small" onClick={() => startEdit(r)}>Edit</button>
                  <button className="btn small danger" onClick={() => remove(r.id)} style={{ marginLeft: 4 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
