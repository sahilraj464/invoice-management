import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/invoices").then((response) => {
      setInvoices(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <Link to="/invoice/new">
        <button>Add New Invoice</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Client Name</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.clientName}</td>
              <td>{invoice.date}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status}</td>
              <td>
                <Link to={`/invoice/${invoice.id}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
