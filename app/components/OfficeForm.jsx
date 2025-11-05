'use client';
import { useState } from 'react';

export default function OfficeForm() {
  const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
  const [form, setForm] = useState({
    posbOpen: 0,
    posbClose: 0,
    netAdd: 0,
    booked: 0,
    bookingAmt: 0,
    ippbOpen: 0,
    ippbPremium: 0,
    giInsurance: 0,
    policyCount: 0,
    sumAssured: 0,
    firstPremium: 0,
    renewalPremium: 0,
    totalTrans: 0,
    collectionAmt: 0,
    stamp: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: Number(value) || 0 };

    if (name === 'posbOpen' || name === 'posbClose') {
      updated.netAdd = updated.posbOpen - updated.posbClose;
    }

    setForm(updated);
  };

  return (
    <form
      className="bg-white shadow-xl rounded-xl p-6 space-y-5 border-t-4 border-yellow-400"
      onSubmit={(e) => e.preventDefault()}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-red-700">
          Report Date: {today}
        </h2>
        <select className="border rounded-lg px-3 py-1 text-gray-700">
          <option>Select Office</option>
          <option>Ballygunge</option>
          <option>Ballygunge SC</option>
          <option>Ballygunge RS</option>
          <option>Bijoygarh</option>
        </select>
      </div>
      <div className="flex flex-col gap-4">
        <InputField
          label="POSB Opened"
          name="posbOpen"
          value={form.posbOpen}
          onChange={handleChange}
        />
        <InputField
          label="POSB Closed"
          name="posbClose"
          value={form.posbClose}
          onChange={handleChange}
        />
        <div />
        <InputField
          label="Net Add (Auto)"
          name="netAdd"
          value={form.netAdd}
          readOnly
        />
        <div className="flex flex-col gap-4">
          <InputField
            label="Articles Booked"
            name="booked"
            value={form.booked}
            onChange={handleChange}
          />
          <InputField
            label="Booking Amount"
            name="bookingAmt"
            value={form.bookingAmt}
            onChange={handleChange}
          />

          <InputField
            label="IPPB Accounts Open"
            name="ippbOpen"
            value={form.ippbOpen}
            onChange={handleChange}
          />
          <InputField
            label="IPPB Premium Open"
            name="ippbPremium"
            value={form.ippbPremium}
            onChange={handleChange}
          />
          <InputField
            label="GI Insurance"
            name="giInsurance"
            value={form.giInsurance}
            onChange={handleChange}
          />
          <InputField
            label="New Policies"
            name="policyCount"
            value={form.policyCount}
            onChange={handleChange}
          />
          <InputField
            label="Sum Assured"
            name="sumAssured"
            value={form.sumAssured}
            onChange={handleChange}
          />
          <InputField
            label="1st Year Premium"
            name="firstPremium"
            value={form.firstPremium}
            onChange={handleChange}
          />
          <InputField
            label="Renewal Premium"
            name="renewalPremium"
            value={form.renewalPremium}
            onChange={handleChange}
          />
          <InputField
            label="Total Transactions"
            name="totalTrans"
            value={form.totalTrans}
            onChange={handleChange}
          />
          <InputField
            label="Collection Amount"
            name="collectionAmt"
            value={form.collectionAmt}
            onChange={handleChange}
          />
          <InputField
            label="My Stamp Procurement"
            name="stamp"
            value={form.stamp}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="pt-4 flex justify-center items-center">
        <button
          type="submit"
          className="bg-linear-to-r from-red-700 to-yellow-400 text-white font-semibold px-6 py-2 rounded-lg shadow hover:scale-[1.02] transition-all">
          📨 Submit / Update Report
        </button>
      </div>
    </form>
  );
}

function InputField({ label, name, value, onChange, readOnly = false }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`border rounded-lg px-3 py-2 ${
          readOnly ? 'bg-gray-100 text-gray-500' : 'focus:border-blue-300'
        }`}
      />
    </div>
  );
}
