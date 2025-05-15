"use client";

import { ChangeEvent, useState } from "react";
import type { Advocate } from "@/types";

type Props = {
  advocates: Advocate[];
};

export default function Dashboard({ advocates }: Props) {
  const [filteredAdvocates, setFilteredAdvocates] = useState(advocates);
  const [searchVal, setSearchVal] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);

    const searchTerm = e.target.value.toLowerCase();

    const filteredAdvocates = advocates.filter((advocate: Advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchTerm) ||
        advocate.lastName.toLowerCase().includes(searchTerm) ||
        advocate.city.toLowerCase().includes(searchTerm) ||
        advocate.degree.toLowerCase().includes(searchTerm) ||
        advocate.specialties.join().toLowerCase().includes(searchTerm) ||
        String(advocate.yearsOfExperience) === searchTerm
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    setSearchVal("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchVal}</span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          onChange={onChange}
          value={searchVal}
        />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate: Advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s, i) => (
                    <div key={i}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
