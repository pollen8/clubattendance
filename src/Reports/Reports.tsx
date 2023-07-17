import {
  BarChart,
  BarChartData,
  ELabelOrientation,
  useWidth,
} from 'cl-react-graph';
import { isWithinInterval } from 'date-fns';
import React, { useEffect } from 'react';

import { useAppDispatch } from '../app/store';
import { getAttendance } from '../Attendance/AttendanceActions';
import { getMembers } from '../Members/MembersActions';
import { useAppSelector } from '../reducers';

type MemberName = string;

type Attendance = [MemberName, number][]
export const Reports = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAttendance());
    dispatch(getMembers());
  }, [dispatch])
  

  const attendance = useAppSelector((state) => state.attendance.data);
  const members = useAppSelector((state) => state.member.data);
  const [ref, width] = useWidth('90%');
  const start = new Date('2022-09-01');
  const end =  new Date('2023-09-01');

if (members.length === 0 || attendance.length === 0) {
  return null;
}
const attendanceReport: Attendance = attendance
.filter((a) => {
  return isWithinInterval(new Date(a.clubNight ?? ''), {
    start,
    end,
  })
})
.reduce((prev, next) => {
  const member = members.find((m) => m.id === next.member);

  const name = !member?.name ? 'unknown':  member.name;
  const index = prev.findIndex(([n]) => n === name);
  if (index === -1) {
    prev.push([name, 1]);
  } else {
    prev[index] = [name, prev[index][1] + 1];
  }

  return prev;
}, [] as Attendance)
.sort((a, b) => a[1] > b[1] ? -1 : 1)

console.log('attendanceReport', attendanceReport);


const data: BarChartData = {
  bins: attendanceReport.map(([name]) => name),
  counts: [
    {
      data: attendanceReport.map(([name, value]) => value),
      label: '',
    },
  ]
};
  return (
    <>
      <div style={{margin: 'auto', width: '90%'}}>
    <h1>2022 - 2023 Attendance</h1>
    <div ref={ref}>
      <BarChart
        data={data}
        height={400}
        xAxisLabelOrientation={ELabelOrientation.VERTICAL}
        width={width} />
    </div>
    <h2 style={{marginTop: '3rem'}}>Breakdown</h2>
    <table style={{width: '20rem'}}>
      <thead>
        <tr>
          <th style={{textAlign: 'left'}}>Name</th>
          <th style={{textAlign: 'right', width: '5rem'}}>Attendance</th>
        </tr>
      </thead>
      <tfoot>
        <td>Total</td>
        <td>
          <strong>
            {attendanceReport.reduce((p, n) => n[1] + p, 0)}
            </strong>
        </td>
      </tfoot>
      <tbody>
        {
          attendanceReport.map(([name, value]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{value}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </div>
    </>
  )
}
