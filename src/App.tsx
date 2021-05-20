import { useState, useEffect } from 'react'
import classes from './config/classes'
import thresholds from './config/thresholds'
import './App.css'

function calculateCost(current: number, goal: number) {
  let cost = 0

  for (let c = current; c < goal; c++) {
    if (c <= 99) {
      cost += Math.floor((c - 1) / 10) + 2
    } else {
      cost += 4 * Math.floor(Math.abs(c - 100) / 5) + 16
    }
  }

  return cost
}

function App() {
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

  useEffect(() => {
    let newPoints = maxPoints - (isTranscended ? 0 : 52)
    
    newPoints -= calculateCost(1, str)
    newPoints -= calculateCost(1, agi)
    newPoints -= calculateCost(1, vit)
    newPoints -= calculateCost(1, int)
    newPoints -= calculateCost(1, dex)
    newPoints -= calculateCost(1, luk)

    setPoints(newPoints)
  }, [maxPoints, isTranscended, str, agi, vit, int, dex, luk])

  function babyOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const baby = e.target.value === 'true'

    setMaxStats(baby ? 117 : 130)
    if (baby) {
      setStr(Math.min(str, 117))
      setAgi(Math.min(agi, 117))
      setVit(Math.min(vit, 117))
      setInt(Math.min(int, 117))
      setDex(Math.min(dex, 117))
      setLuk(Math.min(luk, 117))
    }
  }

  function levelOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const points = parseInt(e.target.value)
    setMaxPoints(points)
  }

  function classOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const classIndex = parseInt(e.target.value)
    setTranscended(classes[classIndex].transcended)
    setJobBonus(classes[classIndex].jobBonuses)
  }

  function strOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
    setStr(Math.min(Math.max(value, 1), maxStats))
  }

  function agiOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
    setAgi(Math.min(Math.max(value, 1), maxStats))
  }

  function vitOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
    setVit(Math.min(Math.max(value, 1), maxStats))
  }

  function intOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
    setInt(Math.min(Math.max(value, 1), maxStats))
  }

  function dexOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
    setDex(Math.min(Math.max(value, 1), maxStats))
  }

  function lukOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
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
              <option value="false">No</option>
              <option value="true">Yes</option>
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
              <span className="add-cost">{str === maxStats ? '-' : calculateCost(str, str + 1)}</span>
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
              <span className="add-cost">{agi === maxStats ? '-' : calculateCost(agi, agi + 1)}</span>
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
              <span className="add-cost">{vit === maxStats ? '-' : calculateCost(vit, vit + 1)}</span>
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
              <span className="add-cost">{int === maxStats ? '-' : calculateCost(int, int + 1)}</span>
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
              <span className="add-cost">{dex === maxStats ? '-' : calculateCost(dex, dex + 1)}</span>
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
              <span className="add-cost">{luk === maxStats ? '-' : calculateCost(luk, luk + 1)}</span>
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
