import React from "react";

const Table = ({ isLoading, headers, noRecord, children }) => (
  <React.Fragment>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan="12" className="loading_text">
                Loading...
              </td>
            </tr>
          </tbody>
        ) : (
          <>
            {noRecord ? (
              <tbody>
                <tr>
                  <td colSpan="12" className="loading_text">
                    No record to show
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>{children}</tbody>
            )}
          </>
        )}
      </table>
    </div>
  </React.Fragment>
);

export default Table;
