"use client";

import { ChangeEvent, useState } from "react";
import type { Advocate } from "@/types";
import { formatPhoneNumber } from "@/utils/utils";

type Props = {
  advocates: Advocate[];
};

export default function Dashboard({ advocates }: Props) {
  const [filteredAdvocates, setFilteredAdvocates] = useState(advocates);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setIsLoading(true);

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
    setIsLoading(false);
  };

  const onClick = () => {
    setSearchVal("");
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="m-12">
      <h1 className="text-2xl">Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchVal}</span>
        </p>
        <input
          className="border mr-6 border-black"
          onChange={onChange}
          value={searchVal}
        />
        <button
          onClick={onClick}
          className="bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 rounded"
        >
          Reset Search
        </button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr className="bg-stone-300">
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
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            filteredAdvocates.map((advocate: Advocate) => {
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
                  <td>{formatPhoneNumber(advocate.phoneNumber)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </main>
  );
}
