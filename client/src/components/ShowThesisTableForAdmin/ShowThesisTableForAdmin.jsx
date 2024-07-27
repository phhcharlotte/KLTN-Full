import React, { useState } from "react";
import "./ShowThesisTableForAdmin.css";
import Pagination from "../Pagination/Pagination";
import SelectCouncil from "../SelectCouncil/SelectCouncil";
import SelectTwoOption from "../SelectTwoOption/SelectTwoOption";
import InputDate from "../InputDate/InputDate";
import { Header, SERVER_URL } from "../../constans";

const ShowThesisTableForAdmin = ({ listTeacher, data, setData }) => {
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

  // role = field - tên trường muốn cập nhật.
  const handleChange = async (value, field) => {
    try {
      const studentCode = value.slice(0, 6);
      const updateName = value.slice(7);
      await fetch(`${SERVER_URL}/status/update`, {
        method: "PUT",
        headers: Header(localStorage.getItem("token")),
        body: JSON.stringify({
          field: field,
          studentCode,
          updateName,
        }),
      });
    } catch (error) {}
  };

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
            <th className="min-width">ĐỀ TÀI</th>
            <th className="min-width">GVHD</th>
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
              <td className="min-width">{dt.tdt}</td>
              <td className="min-width">{dt.gvhd}</td>
              <td>
                <SelectCouncil
                  listTeacher={listTeacher}
                  value={dt.msv + " " + dt.ct}
                  onChange={(value) => handleChange(value, "president")}
                  msv={dt.msv}
                />
              </td>
              <td>
                <SelectCouncil
                  listTeacher={listTeacher}
                  value={dt.msv + " " + dt.pb}
                  onChange={(value) => handleChange(value, "counterArgument")}
                  msv={dt.msv}
                />
              </td>
              <td>
                <SelectCouncil
                  listTeacher={listTeacher}
                  value={dt.msv + " " + dt.tk}
                  onChange={(value) => handleChange(value, "secretary")}
                  msv={dt.msv}
                />
              </td>
              <td>
                <SelectCouncil
                  listTeacher={listTeacher}
                  value={dt.msv + " " + dt.uv}
                  onChange={(value) => handleChange(value, "commissioner")}
                  msv={dt.msv}
                />
              </td>
              <td>
                <InputDate
                  onBlur={(value) => handleChange(`${dt.msv} ${value}`, "date")}
                  value={dt.ng}
                />
              </td>
              <td>{dt.d}</td>
              <td>
                <SelectTwoOption
                  value={dt.msv + " " + dt.gh}
                  onChange={(value) => handleChange(value, "extend")}
                  msv={dt.msv}
                  option={{ op1: "Không", op2: "Có" }}
                />
              </td>
              <td>
                <SelectTwoOption
                  value={dt.msv + " " + dt.tt}
                  onChange={(value) => handleChange(value, "protectStatus")}
                  msv={dt.msv}
                  option={{ op1: "Chưa bảo vệ", op2: "Đã bảo vệ" }}
                />
              </td>
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

export default ShowThesisTableForAdmin;
