import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/navbar";
import Logo from "../../components/logo";
import Table from "../../components/table";

import { getOverviewDataAction, getGuestsAction } from "../../api";

import Icon from "../../assets/svg";
import { formatNumber } from "../../utils/functions";

const HomePage = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [allGuests, setAllGuests] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    getOverviewData();
    getGuests();
  }, []);

  const getOverviewData = async () => {
    await getOverviewDataAction().then((res) => setOverviewData(res));
  };

  const getGuests = async () => {
    await getGuestsAction().then((res) => {
      setAllGuests(res.guests);
    });

    setIsFetching(false);
  };

  const overview = [
    {
      label: "CHECKED GUESTS",
      value: formatNumber(overviewData?.checked_in || 0),
    },
    {
      label: "UNCHECKED GUESTS",
      value: formatNumber(overviewData?.unchecked || 0),
    },
  ];

  const tableHeaders = ["GUEST", "CODE", "CHKD IN", "PHONE NUMBER"];

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
                  <p className="code">{row?.code}</p>
                </td>
                <td>
                  <p>{row?.checked_in ? "YES" : "NO"}</p>
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
