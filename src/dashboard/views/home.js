import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/navbar";
import Logo from "../../components/logo";
import Table from "../../components/table";

import Icon from "../../assets/svg";
import { formatNumber } from "../../utils/functions";

const dummyData = {
  total: 12,
  data: [
    {
      name: "Michael Azonobi",
      code: "RT6U",
      checked: false,
      phone: "09076898765",
    },
    {
      name: "Mazerr Azonobi",
      code: "TY68",
      checked: true,
      phone: "09076898765",
    },
    {
      name: "Michael Azonobi",
      code: "RT6U",
      checked: false,
      phone: "09076898765",
    },
    {
      name: "Michael Azonobi",
      code: "RT6U",
      checked: false,
      phone: "09076898765",
    },
  ],
};

const HomePage = () => {
  const [allGuests, setAllGuests] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    // Make API Call
    setAllGuests(dummyData);

    setIsFetching(false);
  }, []);

  const overview = [
    { label: "CHECKED GUESTS", value: formatNumber(120) },
    { label: "UNCHECKED GUESTS", value: formatNumber(1020) },
  ];

  const tableHeaders = ["GUEST", "CODE", "CHECKED", "PHONE NUMBER"];

  return (
    <React.Fragment>
      <NavBar />

      <div className="page_container home_page_container">
        <Logo />

        <div className="overview">
          {overview?.map((stat, i) => (
            <div key={i} className="stat">
              <Icon name="guest" />

              <p className="value">{stat?.value}</p>
              <p className="label">{stat?.label}</p>
            </div>
          ))}
        </div>

        <div className="section_header">
          <p>All guests</p>

          <Link to="/guests">
            View all <Icon name="arrow" />
          </Link>
        </div>

        <div className="table_container">
          <Table
            isLoading={isFetching}
            headers={tableHeaders}
            noRecord={allGuests?.total < 1}
          >
            {allGuests?.data?.map((row, i) => (
              <tr key={i}>
                <td>
                  <p className="text_wrap">{row?.name}</p>
                </td>
                <td>
                  <p>{row?.code}</p>
                </td>
                <td>
                  <p>{row?.checked ? "YES" : "NO"}</p>
                </td>
                <td>
                  <p>{row?.phone}</p>
                </td>
              </tr>
            ))}
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
