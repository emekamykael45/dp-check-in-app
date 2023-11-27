import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/navbar";
import Logo from "../../components/logo";
import FormInput from "../../components/form-input";
import Table from "../../components/table";

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

const GuestsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [allGuests, setAllGuests] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    searchGuests();

    setIsFetching(false);
  }, [searchInput]);

  const searchGuests = async () => {
    // Make API Call
    setAllGuests(dummyData);
  };

  const tableHeaders = ["GUEST", "CODE", "CHECKED", "PHONE NUMBER"];

  return (
    <React.Fragment>
      <NavBar />

      <div className="page_container home_page_container">
        <Logo />

        <div className="section_header">
          <p>All guests ({formatNumber(1020)})</p>

          <Link to="/guests/new" className="btn_primary">
            + Add new
          </Link>
        </div>

        <div className="table_container">
          <div className="table_filter">
            <div className="left_side">
              <FormInput
                placeholder="Search by code or name"
                type="text"
                onChange={(e) => setSearchInput(e?.target?.value)}
                readOnly={isFetching}
              />
            </div>
          </div>

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

export default GuestsPage;
