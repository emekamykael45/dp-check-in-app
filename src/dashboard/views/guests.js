import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/navbar";
import Logo from "../../components/logo";
import FormInput from "../../components/form-input";
import Button from "../../components/button";
import Table from "../../components/table";

import { getGuestsAction, deleteGuestAction } from "../../api";

import { capitalizeWord, formatNumber } from "../../utils/functions";
import Icon from "../../assets/svg";

const GuestsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [allGuests, setAllGuests] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (searchInput?.length < 1) {
      searchGuests();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const searchGuests = async () => {
    setIsFetching(true);

    await getGuestsAction({ searchInput: searchInput?.toLowerCase() }).then(
      (res) => {
        setAllGuests(res);
      }
    );

    setIsFetching(false);
  };

  const deleteGuest = async (guest) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${capitalizeWord(guest?.name)}`
      )
    ) {
      setIsFetching(true);

      await deleteGuestAction(guest?.id).then((res) => {
        if (res.success === true) {
          searchGuests();
        } else {
          setIsFetching(false);
        }
      });
    }
  };

  const tableHeaders = ["GUEST", "CODE", "CHKD IN", "PHONE NUMBER", ""];

  return (
    <React.Fragment>
      <NavBar />

      <div className="page_container home_page_container">
        <Logo />

        <div className="section_header">
          <p>All guests ({formatNumber(allGuests?.total || 0)})</p>

          <Link to="/guests/new" className="btn_primary">
            + Add new
          </Link>
        </div>

        <div className="table_container">
          <div className="table_filter">
            <div className="left_side">
              <FormInput
                placeholder="Search by code, name or phone"
                type="text"
                onChange={(e) => setSearchInput(e?.target?.value)}
                readOnly={isFetching}
              />
            </div>

            <Button
              text="Search"
              className="btn_secondary"
              onClick={searchGuests}
            />
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
                  <p className="code">{row?.code}</p>
                </td>
                <td>
                  <p>{row?.checked_in ? "YES" : "NO"}</p>
                </td>
                <td>
                  <p>{row?.phone}</p>
                </td>
                <td>
                  <p onClick={() => deleteGuest(row)}>
                    <Icon name="delete" />
                  </p>
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
