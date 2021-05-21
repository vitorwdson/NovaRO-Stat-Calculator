import { useState, useEffect } from 'react'
import classes from './config/classes'
import thresholds from './config/thresholds'
import './App.css'

function App() {
  // Initializing the necessary States
  const [points, setPoints] = useState(0)
  const [maxPoints, setMaxPoints] = useState(thresholds[0].points)
  const [jobBonus, setJobBonus] = useState(classes[0].jobBonuses)
  const [isTranscended, setTranscended] = useState(true)
  const [maxStats, setMaxStats] = useState(130)
  const [str, setStr] = useState(1)
  const [agi, setAgi] = useState(1)
  const [vit, setVit] = useState(1)
  const [int, setInt] = useState(1)
  const [dex, setDex] = useState(1)
  const [luk, setLuk] = useState(1)

  // Defines the effect to update the available stat points
  useEffect(() => {
    // Initializes the new points variable with the amount based on the
    let newPoints = maxPoints

    // Checks if the character is not transcended and, if so, subtract 52 points
    if (!isTranscended)
      newPoints -= 52
    
    // Subtract the cost related to the amount of STR from the available points
    newPoints -= calculateCost(1, str)
    // Subtract the cost related to the amount of AGI from the available points
    newPoints -= calculateCost(1, agi)
    // Subtract the cost related to the amount of VIT from the available points
    newPoints -= calculateCost(1, vit)
    // Subtract the cost related to the amount of INT from the available points
    newPoints -= calculateCost(1, int)
    // Subtract the cost related to the amount of DEX from the available points
    newPoints -= calculateCost(1, dex)
    // Subtract the cost related to the amount of LUK from the available points
    newPoints -= calculateCost(1, luk)

    // Updates the amount of available stat points
    setPoints(newPoints)
  }, [maxPoints, isTranscended, str, agi, vit, int, dex, luk])

  // Function to calculate the cost to increase from current to goal
  function calculateCost(current: number, goal: number) {
    // Initializes the cost variable
    let cost = 0

    // Loop through the range between current and goal using the variable c
    for (let c = current; c < goal; c++) {
      if (c <= 99) {
        // If c is lower or equal than 99, use the formula: floor(x-1)/10+2
        cost += Math.floor((c - 1) / 10) + 2
      } else {
        // If c is greater than 99, use the formula: floor(abs(x-100))/5+16
        cost += 4 * Math.floor(Math.abs(c - 100) / 5) + 16
      }
    }

    return cost
  }

  // Function to calculate the cost for the next increase
  function nextCost(stat: number) {
    // Checks if the stat is already maxed and returns '-' or the cost calculated
    return stat === maxStats ? '-' : calculateCost(stat, stat + 1)
  }

  // Function to handle the onChange event for the isBaby selector
  function babyOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // Checks if the value selected was 'Yes'
    const baby = e.target.value === 'yes'

    // Updates tehe maximum amount of stats according to the value selected
    setMaxStats(baby ? 117 : 130)

    // If the value selected was 'Yes', update all stats to it or the limit
    if (baby) {
      setStr(Math.min(str, 117))
      setAgi(Math.min(agi, 117))
      setVit(Math.min(vit, 117))
      setInt(Math.min(int, 117))
      setDex(Math.min(dex, 117))
      setLuk(Math.min(luk, 117))
    }
  }

  // Function to handle the onChange event for the level selector
  function levelOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // Get the selected value and convert it to Int
    const points = parseInt(e.target.value)

    // Update the max points based on the level selected
    setMaxPoints(points)
  }

  // Function to handle the onChange event for the class selector
  function classOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    // Get the selected value and convert it to Int
    const classIndex = parseInt(e.target.value)

    // Update the trancended status based on the class selected
    setTranscended(classes[classIndex].transcended)
    // Update the job bonus stats based on the class selected
    setJobBonus(classes[classIndex].jobBonuses)
  }

  // Function to handle the onChange event for the str input
  function strOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Get the selected value and convert it to Int
    const value = parseInt(e.target.value)
    // Update the str value limited between 1 and maxStats
    setStr(Math.min(Math.max(value, 1), maxStats))
  }

  // Function to handle the onChange event for the agi input
  function agiOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Get the selected value and convert it to Int
    const value = parseInt(e.target.value)
    // Update the agi value limited between 1 and maxStats
    setAgi(Math.min(Math.max(value, 1), maxStats))
  }

  // Function to handle the onChange event for the vit input
  function vitOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Get the selected value and convert it to Int
    const value = parseInt(e.target.value)
    // Update the vit value limited between 1 and maxStats
    setVit(Math.min(Math.max(value, 1), maxStats))
  }

  // Function to handle the onChange event for the int input
  function intOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Get the selected value and convert it to Int
    const value = parseInt(e.target.value)
    // Update the int value limited between 1 and maxStats
    setInt(Math.min(Math.max(value, 1), maxStats))
  }

  // Function to handle the onChange event for the dex input
  function dexOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Get the selected value and convert it to Int
    const value = parseInt(e.target.value)
    // Update the dex value limited between 1 and maxStats
    setDex(Math.min(Math.max(value, 1), maxStats))
  }

  // Function to handle the onChange event for the luk input
  function lukOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Get the selected value and convert it to Int
    const value = parseInt(e.target.value)
    // Update the luk value limited between 1 and maxStats
    setLuk(Math.min(Math.max(value, 1), maxStats))
  }

  return (
    <div className="box">
      <h1>STAT CALCULATOR</h1>

      <div className="row">

        <div className="col s60">
          <label htmlFor="classSelector">Choose your Class:</label>
          <select id="classSelector" onChange={classOnChange}>
            {
              classes.map((cl, i) => (
                <option value={i} key={cl.name}>{cl.name}</option>
              ))
            }
          </select>
        </div>

        <div className="col s20">
          <label htmlFor="levelelector">Level:</label>
          <select id="levelelector" onChange={levelOnChange}>
            {
              thresholds.map(th => (
                <option value={th.points} key={th.level}>{th.level}</option>
              ))
            }
          </select>
        </div>

        <div className="col s20">
          <label htmlFor="babyelector">Baby?:</label>
          <select id="babySelector" onChange={babyOnChange}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
          </select>
        </div>

      </div>

      <br />

      <div className="row">
        <div className="col s50 align-top">

          <div className="row">
            <div className="col s25">
              <label htmlFor="strStatInput">STR:</label>
            </div>
            <div className="col s75 stat-input-group">
              <input type="number" min="1" value={str} max={maxStats} id="strStatInput" onChange={strOnChange} />
              <button className="subtract" onClick={() => setStr(Math.max(str - 1, 1))}>◀</button>
              <button className="add" onClick={() => setStr(Math.min(str + 1, maxStats))}>▶</button>
              <span className="job-bonus"> +{jobBonus.str}</span>
              <span className="add-cost">{nextCost(str)}</span>
            </div>
          </div>

          <div className="row">
            <div className="col s25">
              <label htmlFor="agiStatInput">AGI:</label>
            </div>
            <div className="col s75 stat-input-group">
              <input type="number" min="1" value={agi} max={maxStats} id="agiStatInput" onChange={agiOnChange} />
              <button className="subtract" onClick={() => setAgi(Math.max(agi - 1, 1))}>◀</button>
              <button className="add" onClick={() => setAgi(Math.min(agi + 1, maxStats))}>▶</button>
              <span className="job-bonus"> +{jobBonus.agi}</span>
              <span className="add-cost">{nextCost(agi) }</span>
            </div>
          </div>

          <div className="row">
            <div className="col s25">
              <label htmlFor="vitStatInput">VIT:</label>
            </div>
            <div className="col s75 stat-input-group">
              <input type="number" min="1" value={vit} max={maxStats} id="vitStatInput" onChange={vitOnChange} />
              <button className="subtract" onClick={() => setVit(Math.max(vit - 1, 1))}>◀</button>
              <button className="add" onClick={() => setVit(Math.min(vit + 1, maxStats))}>▶</button>
              <span className="job-bonus"> +{jobBonus.vit}</span>
              <span className="add-cost">{nextCost(vit) }</span>
            </div>
          </div>

        </div>
        <div className="col s50">

          <div className="row">
            <div className="col s25">
              <label htmlFor="intStatInput">INT:</label>
            </div>
            <div className="col s75 stat-input-group">
              <input type="number" min="1" value={int} max={maxStats} id="intStatInput" onChange={intOnChange} />
              <button className="subtract" onClick={() => setInt(Math.max(int - 1, 1))}>◀</button>
              <button className="add" onClick={() => setInt(Math.min(int + 1, maxStats))}>▶</button>
              <span className="job-bonus"> +{jobBonus.int}</span>
              <span className="add-cost">{nextCost(int) }</span>
            </div>
          </div>

          <div className="row">
            <div className="col s25">
              <label htmlFor="dexStatInput">DEX:</label>
            </div>
            <div className="col s75 stat-input-group">
              <input type="number" min="1" value={dex} max={maxStats} id="dexStatInput" onChange={dexOnChange} />
              <button className="subtract" onClick={() => setDex(Math.max(dex - 1, 1))}>◀</button>
              <button className="add" onClick={() => setDex(Math.min(dex + 1, maxStats))}>▶</button>
              <span className="job-bonus"> +{jobBonus.dex}</span>
              <span className="add-cost">{nextCost(dex) }</span>
            </div>
          </div>

          <div className="row">
            <div className="col s25">
              <label htmlFor="lukStatInput">LUK:</label>
            </div>
            <div className="col s75 stat-input-group">
              <input type="number" min="1" value={luk} max={maxStats} id="lukStatInput" onChange={lukOnChange} />
              <button className="subtract" onClick={() => setLuk(Math.max(luk - 1, 1))}>◀</button>
              <button className="add" onClick={() => setLuk(Math.min(luk + 1, maxStats))}>▶</button>
              <span className="job-bonus"> +{jobBonus.luk}</span>
              <span className="add-cost">{nextCost(luk) }</span>
            </div>
          </div>

          <div className="row">
            <div className="col s60">
              <label htmlFor="statPoints">Available points:</label>
            </div>
            <div className="col s40">
              <input type="text" value={points} disabled />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
