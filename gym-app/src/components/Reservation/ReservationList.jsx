import React, { useState } from 'react'
import * as format from '../../utils/format';
import './Reservation.css'
import ReservationListModal from './ReservationListModal';

const ReservationList = ({ reservationList }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedReservationNo, setSelectedReservationNo] = useState(null)
  const [action, setAction] = useState('')

  const openModal = (reservationNo, action) => {
    setSelectedReservationNo(reservationNo)
    setAction(action)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedReservationNo(null)
    setIsModalOpen(false)
  }


  return (
    <>
      <div className="search-container">

      </div>
      <div className="list">
        <table>
          <thead style={{ fontWeight: 'bold' }}>
            <tr>
              <th>No</th>
              <th>회원명(ID)</th>
              <th>트레이너</th>
              <th>예약 시간</th>
              <th>신청 일시</th>
              <th>완료/취소 일시</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {
              reservationList.length == 0
                ?
                <tr>
                  <td colSpan={7} align='center'>조회된 데이터가 없습니다.</td>
                </tr>
                :
                reservationList.map((reservation) => {
                  return (
                    <tr key={reservation.no}>
                      <td>{reservation.no}</td>
                      <td>{reservation.userName}({reservation.userId})</td>
                      <td>{reservation.trainerName}</td>
                      <td style={{fontWeight : "bold"}}>{format.formatRvDate(reservation.rvDate)}</td>
                      <td>{format.formatDate(reservation.createdAt)}</td>
                      {reservation.enabled == 2 ? (
                        <td style={{ color: "#2a9c1b" }}>
                          {format.formatDate(reservation.canceledAt)}</td>
                      )
                        : reservation.enabled == 1 ? (
                          <td></td>
                        )
                          : reservation.enabled == 0 ? (
                            <td style={{ color: '#dc3545' }}>
                              {format.formatDate(reservation.canceledAt)}</td>
                          )
                            : null}
                      <td style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        {reservation.enabled == 1 && (
                          <>
                            <button
                              type="button"
                              className="complete"
                              data-no={reservation.no}
                              onClick={() => openModal(reservation.no, 'complete')}
                            >
                              완료
                            </button>
                            <button
                              type="button"
                              className="cancel"
                              data-no={reservation.no}
                              onClick={() => openModal(reservation.no, 'cancel')}
                            >
                              취소
                            </button>
                          </>
                        )}
                        {reservation.enabled == 2 && <span className="ptComplete">완료</span>}
                        {reservation.enabled == 0 && <span className="cancel-text">취소</span>}
                      </td>
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <ReservationListModal reservationNo={selectedReservationNo} action={action} isModalOpen={isModalOpen} closeModal={closeModal} />
      )}
    </>
  )
}

export default ReservationList
