import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/navbar";
import Logo from "../../components/logo";
import FormInput from "../../components/form-input";
import Button from "../../components/button";
import Table from "../../components/table";

import { getGuestsAction, deleteGuestAction } from "../../api";

import {
  isAdminUser,
  capitalizeWord,
  formatNumber,
} from "../../utils/functions";
import { APP_API_GET_LIMIT } from "../../utils/constants";
import Icon from "../../assets/svg";

const GuestsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [allGuests, setAllGuests] = useState(null);
  const [firstRecord, setFirstRecord] = useState(null);
  const [lastRecord, setLastRecord] = useState(null);
  const [sortByAsc, setSortByAsc] = useState(true);
  const [page, setPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (searchInput?.length > 1) {
      searchGuests();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const getFirstPage = async () => {
    setIsFetching(true);

    await getGuestsAction({ sortByAsc }).then((res) => {
      setPage(1);
      setAllGuests(res.guests);
      setFirstRecord(res.firstRecord);
      setLastRecord(res.lastRecord);
    });

    setIsFetching(false);
  };
  useEffect(() => {
    getFirstPage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortByAsc]);

  const searchGuests = async () => {
    setIsFetching(true);

    await getGuestsAction({
      searchInput: searchInput?.toLowerCase(),
    }).then((res) => {
      setAllGuests(res.guests);
    });

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

  const paginatePrev = async () => {
    setIsFetching(true);

    await getGuestsAction({ paginatePrev: true, sortByAsc, firstRecord }).then(
      (res) => {
        setPage(page - 1);
        setAllGuests(res.guests);
        setFirstRecord(res.firstRecord);
        setLastRecord(res.lastRecord);
      }
    );

    setIsFetching(false);
  };

  const paginateNext = async () => {
    setIsFetching(true);

    await getGuestsAction({ paginateNext: true, sortByAsc, lastRecord }).then(
      (res) => {
        setPage(page + 1);
        setAllGuests(res.guests);
        setFirstRecord(res.firstRecord);
        setLastRecord(res.lastRecord);
      }
    );

    setIsFetching(false);
  };

  const tableHeaders = ["GUEST", "CODE", "CHKD IN", "PHONE NUMBER", ""];

  const totalPages = Math.ceil(allGuests?.total / APP_API_GET_LIMIT || 0);

  return (
    <React.Fragment>
      <NavBar />

      <div className="page_container home_page_container">
        <Logo />

        <div className="section_header">
          <p>All guests ({formatNumber(allGuests?.total || 0)})</p>

          {isAdminUser() && (
            <Link to="/guests/new" className="btn_primary">
              + Add new
            </Link>
          )}
        </div>

        <div className="table_container">
          <div className="table_filter">
            <div className="left_side">
              <FormInput
                placeholder="Search by code, name or phone"
                type="text"
                onChange={(e) => setSearchInput(e?.target?.value)}
              />
            </div>

            <Button
              text={sortByAsc ? "asc>" : "desc<"}
              className="btn_secondary"
              onClick={() => setSortByAsc(!sortByAsc)}
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
                  {isAdminUser() ? (
                    <p onClick={() => deleteGuest(row)}>
                      <Icon name="delete" />
                    </p>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </Table>

          {!searchInput && (
            <div className="pagination">
              <Button
                text="<<"
                className="btn_secondary"
                onClick={paginatePrev}
                disabled={page < 2}
              />

              <p className="page">
                Page <span>{page}</span> / {totalPages}
              </p>

              <Button
                text=">>"
                className="btn_secondary"
                onClick={paginateNext}
                disabled={page === totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default GuestsPage;
