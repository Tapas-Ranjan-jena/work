export default function ClientHeader() {
  return (
    <div className="bg-light border rounded p-3 mb-3 d-flex justify-content-between">

      <div>
        <strong>Client Name -</strong> 24 MOONTIMES NEWS PRIVATE LIMITED
      </div>

      <div>
        Switch Client :
        <select className="ms-2">
          <option>--</option>
        </select>
      </div>

    </div>
  )
}
