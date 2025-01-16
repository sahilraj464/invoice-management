import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function InvoiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [invoice, setInvoice] = useState({
    invoiceNumber: "",
    clientName: "",
    date: "",
    amount: "",
    status: "Unpaid",
  });

  useEffect(() => {
    if (id && id !== "new") {
      axios.get(`http://localhost:5000/invoices/${id}`).then((response) => {
        setInvoice(response.data);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id === "new") {
      axios
        .post("http://localhost:5000/invoices", invoice)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error creating invoice: ", error));
    } else {
      axios
        .put(`http://localhost:5000/invoices/${id}`, invoice)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error updating invoice: ", error));
    }
  };

  return (
    <div>
      <h2>{id === "new" ? "Create Invoice" : "Edit Invoice"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Invoice Number"
          value={invoice.invoiceNumber}
          onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Client Name"
          value={invoice.clientName}
          onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })}
          required
        />
        <input
          type="date"
          value={invoice.date}
          onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={invoice.amount}
          onChange={(e) => setInvoice({ ...invoice, amount: e.target.value })}
          required
        />
        <select
          value={invoice.status}
          onChange={(e) => setInvoice({ ...invoice, status: e.target.value })}
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Pending">Pending</option>
        </select>
        <button type="submit">{id === "new" ? "Create" : "Update"} Invoice</button>
      </form>
    </div>
  );
}

export default InvoiceForm;
