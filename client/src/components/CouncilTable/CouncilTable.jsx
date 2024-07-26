import React from 'react'
import './CouncilTable.css'
import SelectTwoOption from '../SelectTwoOption/SelectTwoOption'
import InputScore from '../InputScore/InputScore'
import { Header, SERVER_URL } from '../../constans'

const CouncilTable = ({ data, name }) => {
  const checkRoleInCouncil = (record, name) => {
    if (record.president === name) return 'Chủ Tịch'
    if (record.counterArgument === name) return 'Phản Biện'
    if (record.secretary === name) return 'Thư Ký'
    if (record.commissioner === name) return 'Ủy Viên'
    if (record.instructor === name) return 'Giáo Viên Hướng Dẫn'
  }

  const handleSelectChange = async (value, field) => {
    try {
      const studentCode = value.slice(0, 6)
      const updateName = value.slice(7)
      await fetch(`${SERVER_URL}/status/update`, {
        method: 'PUT',
        headers: Header(localStorage.getItem('token')),
        body: JSON.stringify({
          field: field,
          studentCode,
          updateName,
        }),
      })
    } catch (error) {}
  }

  return (
    <>
      {!data.length ? (
        <div className='no-data'>
          <i className='bx bx-error-alt'></i>Không có dữ liệu
        </div>
      ) : (
        <table className='council-table'>
          <thead>
            <tr>
              <th>Vai Trò</th>
              <th>Sinh Viên</th>
              <th>Link Tài Liệu Của Sinh Viên</th>
              <th>Link Sản Phẩm Của Sinh Viên</th>
              <th className='width-10'>Điểm</th>
              <th className='width-10'>Cho Phép Bảo Vệ</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt) => (
              <tr key={dt._id}>
                <td>{checkRoleInCouncil(dt, name)}</td>
                <td>{dt.studentCode}</td>
                <td>{dt.linkDrive}</td>
                <td>{dt.linkGithub}</td>
                <td>
                  <InputScore
                    onBlur={(value) => handleSelectChange(`${dt.studentCode} ${value}`, 'score')}
                    value={dt.score}
                  />
                </td>
                <td>
                  <SelectTwoOption
                    onChange={(value) => handleSelectChange(value, 'allowProtect')}
                    value={dt.studentCode + ' ' + dt.allowProtect}
                    msv={dt.studentCode}
                    option={{ op1: 'Không', op2: 'Có' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default CouncilTable
