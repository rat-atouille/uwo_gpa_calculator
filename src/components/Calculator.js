import React, { useState } from 'react';
import './Calculator.scss';

const Calculator = () => {
  const [rows, setRows] = useState([{ grade: '', credit: 0.5 }]);
  const [culm, setCulm] = useState(0);
  const [descript, setDescript] = useState(false);

  // change input values
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  // addRow
  const addRow = (e) => {
    e.preventDefault();
    setRows([...rows, { grade: '', credit: 0.5 }]);
  };

  const calculate = (e) => {
    e.preventDefault(); 

    // cGPA calculation
    // credit x gpa = total 
    // total sum / total course weight = cGPA
    let sum = 0;    // sum of total calculated stuff
    let temp = 0;   // temp variable
    let weight = 0; // total credits
    let hasError = false;
    rows.forEach((item) => {
      // grade is negative or be larger than 100 
      if (item.grade < 0 || item.grade > 100 || !item.grade || isNaN(parseInt(item.grade))) {
        if (!hasError) {
          alert("Enter a valid grade between 0 and 100 or in a 4.0 GPA scale");
          hasError = true;
        }
        return;
      } if (item.credit != 0.5 && item.credit !=1) {
          if (!hasError) {
            alert("Enter a valid credit (0.5 or 1)!");
            hasError = true;
          }
        return;
      } else {
        if (item.grade < 50) {  // find culm
          if (item.grade > 4){  // not in 4.0 gpa scale -> Fail = 0
            temp = 0;
            temp = temp * item.credit;   
          } else {
            temp = item.grade * item.credit; // calculate credit x gpa
          }
        } else {   // convert to gpa
          temp = convertGPA(item.grade);    // convert to gpa scale
          temp = temp * item.credit;        // credit x gpa
        }

        sum += temp;                        // add all credit x gpa calculations
        weight +=  parseFloat(item.credit); // total course weight
      }
    })
    if (weight > 0) {
      const cGPA = sum / weight;
      setCulm(Math.round(cGPA * 10) / 10); // Round to the nearest tenth
    } else {
      setCulm(0);
    }
  }
  
  // convert to gpa
  const convertGPA = (grade) => {
    if (grade >= 90) return 4.0;
    if (grade >= 85) return 3.9;
    if (grade >= 80) return 3.7;
    if (grade >= 77) return 3.3;
    if (grade >= 73) return 3.0;
    if (grade >= 70) return 2.7;
    if (grade >= 67) return 2.3;
    if (grade >= 63) return 2.0;
    if (grade > 60) return 1.7;
    if (grade >= 57) return 1.3;
    if (grade >= 53) return 1.0;
    if (grade >= 50) return 0.7;
    return 0;
  }

  const deleteRow = (tagetIndex) => {
    if (rows.length > 1) {
      const updatedRows = rows.filter((item,index) => index !== tagetIndex);
      setRows(updatedRows);  
    } else {
      return;
    }
  }

  const clearRow = () => {
    setRows([{ grade: '', credit: '' }]);
  }

  return (
    <div className='calculator'>
      <h1>Calculate your GPA.</h1>
      <p>
      Western doesn't calculate your GPA, but we've got you covered!
      <br/>Simply enter your grades on the <b style={{ color: '#7b2cbf'}}>4.0 GPA scale</b> or as a <b style={{ color: '#7b2cbf'}}>percentage</b>, 
      and we'll handle the GPA conversion for you automatically.
      </p>
      <div className='container'>
        <div className='inputs'>
          <form onSubmit={calculate}>
            <div className='labels'>
              <label>Grade</label>
              <label>Credit</label>
            </div>
            {rows.map((row, index) => (
              <div key={index} className={'input-row '}>
                <input
                  name="grade"
                  id={`grade-${index}`}
                  maxLength="3"
                  placeholder='70'
                  value={row.grade}
                  className={(row.grade < 0 || row.grade > 100 || !row.grade || isNaN(parseInt(row.grade))) ? 'error' : ''}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  name="credit"
                  id={`credit-${index}`}
                  placeholder='0.5'
                  value={row.credit}
                  className={(row.credit != 0.5 && row.credit != 1) ? 'error' : ''}
                  onChange={(e) => handleChange(index, e)}
                />
                <span className='delete' onClick={()=>deleteRow(index)}>✖</span>
              </div>
            ))}

            <p className='help'>Press enter to add a row.
              <br/>Mark below 50% or Fail is considered 0.
            </p>
            <div className='button-container'>
            <button type='button' onClick={clearRow} className='clear'>Reset</button>
              <button onClick={addRow} className='add'
                >Add Row</button>
              <button type='submit' className='submit'>Calculate</button>
            </div>
          </form>
        </div>
        <p className='cgpa'>cGPA: <span>{culm}</span></p>
        <div className='cal' onClick={()=> setDescript(!descript)}> <p>How is it calculated?</p>
        {descript && (
          <div className='description'>
            Percentages are converted to GPA values based on the <a href='https://www.ouac.on.ca/guide/undergraduate-grade-conversion-table' target='_blank'>OUAC undergraduate grade conversion table</a>. Cumulative GPA is calculated after converting percentages to GPA.        
          </div>
        )}
      </div>
      </div>

    </div>
  );
}

export default Calculator;
