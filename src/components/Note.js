import React from 'react';

const Note = () => {
  return (
    <div className='note'>
      <h1>How cGPA calculated</h1>
      <p>
        Percentage is converted to GPA according to <a href='https://www.ouac.on.ca/guide/undergraduate-grade-conversion-table' target='_blank'>OUAC</a> and the culmalative percentage is caculated after GPA conversion.
        <br/>PASS is not counted towards your cGPA but FAIL does (i.e. do NOT include your passed discovery credit courses in the calculator). 
        <br/>FAIL will equal 0.
      </p>
    </div>
  )
}

export default Note;