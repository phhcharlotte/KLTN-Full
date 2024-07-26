// src/components/ThesisTable.jsx
import React, { useState } from "react";
import "./ShowThesisTable.css";
import Pagination from "../Pagination/Pagination";

const ShowThesisTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const end = currentPage * itemsPerPage;
  const start = end - itemsPerPage;
  const renderData = data.slice(start, end);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <table className="thesis-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>KỲ</th>
            <th>NĂM</th>
            <th>MSV</th>
            <th>HỌ ĐỆM</th>
            <th>TÊN</th>
            <th>NGÀY SINH</th>
            <th>LỚP</th>
            <th>SĐT</th>
            <th>ĐỀ TÀI</th>
            <th>GVHD</th>
            <th>CHỦ TỊCH</th>
            <th>PHẢN BIỆN</th>
            <th>THƯ KÝ</th>
            <th>ỦY VIÊN</th>
            <th>NGÀY</th>
            <th>ĐIỂM</th>
            <th>GIA HẠN</th>
            <th>TRẠNG THÁI</th>
            <th>ĐƯỢC PHÉP BẢO VỆ</th>
          </tr>
        </thead>
        <tbody>
          {renderData.map((dt, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dt.ky}</td>
              <td>{dt.nam}</td>
              <td>{dt.msv}</td>
              <td>{dt.hd}</td>
              <td>{dt.t}</td>
              <td>{dt.ns}</td>
              <td>{dt.lcn}</td>
              <td>{dt.sdt}</td>
              <td>{dt.tdt}</td>
              <td>{dt.gvhd}</td>
              <td>{dt.ct}</td>
              <td>{dt.pb}</td>
              <td>{dt.tk}</td>
              <td>{dt.uv}</td>
              <td>{dt.ng}</td>
              <td>{dt.d}</td>
              <td>{dt.gh}</td>
              <td>{dt.tt}</td>
              <td>{dt.alp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!data.length ? (
        <div className="no-data">
          <i className="bx bx-error-alt"></i>Không có dữ liệu
        </div>
      ) : null}
      {data.length > 10 && (
        <Pagination
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default ShowThesisTable;
