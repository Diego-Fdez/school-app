import React from 'react';

const QtResTable = ({ student }) => {
  const {
    course,
    level,
    quarter,
    studentId,
    test1,
    perTest1,
    test2,
    perTest2,
    assists,
    homework,
  } = student;

  return (
    <div className='result-card'>
      <div className='result-wrapper'>
        <h4>
          Date: <span>27/04/2022</span>
        </h4>
        <div>
          <span>Course:</span>
          <span>{course?.desc}</span>
        </div>
        <div>
          <span>Student:</span>
          <span>{`${studentId?.studentName} ${studentId?.studentFirstName} ${studentId?.studentLastName}`}</span>
        </div>
        <div>
          <span>Quarter:</span>
          <span>{quarter?.desc}</span>
        </div>
        <div>
          <span>First Test:</span>
          <span>{test1 ? test1 : 'Soon'}</span>
        </div>
        <div>
          <span>Percentage:</span>
          <span>{perTest1 ? perTest1 + '%' : 'Soon'}</span>
        </div>
        <div>
          <span>Second Test:</span>
          <span>{test2 ? test2 : 'Soon'}</span>
        </div>
        <div>
          <span>Percentage:</span>
          <span>{perTest2 ? perTest2 + '%' : 'Soon'}</span>
        </div>
        <div>
          <span>Assists:</span>
          <span>{assists ? assists + '%' : 'Soon'}</span>
        </div>
        <div>
          <span>Homework:</span>
          <span>{homework ? homework + '%' : 'Soon'}</span>
        </div>
        <div>
          <span>Level:</span>
          <span>{level?.desc}</span>
        </div>
        <div>
          <span>Condition:</span>
          <span>Approved</span>
        </div>
      </div>
    </div>
  );
};

export default QtResTable;
