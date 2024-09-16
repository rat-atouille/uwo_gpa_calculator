import React, { useState } from 'react';
import './Calculator.scss';

const Calculator = () => {
  const [rows, setRows] = useState([{ grade: '', credit: '0.5' }]);
  const [errorr, setError] = useState('');
  const [culm, setCulm] = useState(0);

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
    setRows([...rows, { grade: '', credit: '0.5' }]);
  };

  const calculate = (e) => {
    e.preventDefault(); 

    // cGPA calculation
    // credit x gpa = total 
    // total sum / total course weight = cGPA
    let sum = 0;    // sum of total calculated stuff
    let temp = 0;   // temp variable
    let weight = 0; // total credits

    rows.forEach((item, index) => {
      // grade is negative or be larger than 100 
      if (item.grade < 0 || item.grade > 100 || !item.grade) {
        setError('incorrect grade')
      } if (item.credit != 0.5 && item.credit != 1) {
        setError('incorrect credit')
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

  return (
    <div className='calculator'>
      <h1>University of Western Ontario GPA Calculator</h1>
      <p>Enter your grade in GPA or percentage. I will automatically calculate it into GPA for you.</p>
      <div className='inputs'>

        <form onSubmit={calculate}>
          <div className='labels'>
            <label>Grade</label>
            <label>Credit</label>
          </div>
          {rows.map((row, index) => (
            <div key={index} className='input-row'>
              <input
                name="grade"
                id={`grade-${index}`}
                maxLength="3"
                placeholder='70'
                value={row.grade}
                onChange={(e) => handleChange(index, e)}
              />
              <input
                name="credit"
                id={`credit-${index}`}
                placeholder='0.5'
                value={row.credit}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          ))}

          <p>Press enter to add a row</p>
          <div className='button-container'>
            <button onClick={addRow} className='add'
              >Add Row</button>
            <button type='submit' className='submit'>Calculate</button>
          </div>
        </form>
      </div>
      <p className='cgpa'>{culm}</p>
    </div>
  );
}

export default Calculator;
