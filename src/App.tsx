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
    <div className="App">
      <label htmlFor="classSelector">Choose your Class:</label>
      <select id="classSelector" onChange={classOnChange}>
        {
          classes.map((cl, i) => (
            <option value={i} key={cl.name}>{cl.name}</option>
          ))
        }
      </select>
      <br />
      <label htmlFor="levelelector">Level Range:</label>
      <select id="levelelector" onChange={levelOnChange}>
        {
          thresholds.map(th => (
            <option value={th.points} key={th.level}>{th.level}</option>
          ))
        }
      </select>
      <br />
      <label htmlFor="babyelector">Baby?:</label>
      <select id="babySelector" onChange={babyOnChange}>
          <option value="false">No</option>
          <option value="true">Yes</option>
      </select>
      <br />
      <label htmlFor="strStatInput">STR:</label>
      <input type="number" min="1" value={str} max={maxStats} id="strStatInput" onChange={strOnChange} />
      <span>{calculateCost(str, str + 1)}</span>
      <span> + {jobBonus.str}</span>
      <br />
      <label htmlFor="agiStatInput">AGI:</label>
      <input type="number" min="1" value={agi} max={maxStats} id="agiStatInput" onChange={agiOnChange} />
      <span>{calculateCost(agi, agi + 1)}</span>
      <span> + {jobBonus.agi}</span>
      <br />
      <label htmlFor="vitStatInput">VIT:</label>
      <input type="number" min="1" value={vit} max={maxStats} id="vitStatInput" onChange={vitOnChange} />
      <span>{calculateCost(vit, vit + 1)}</span>
      <span> + {jobBonus.vit}</span>
      <br />
      <label htmlFor="intStatInput">INT:</label>
      <input type="number" min="1" value={int} max={maxStats} id="intStatInput" onChange={intOnChange} />
      <span>{calculateCost(int, int + 1)}</span>
      <span> + {jobBonus.int}</span>
      <br />
      <label htmlFor="dexStatInput">DEX:</label>
      <input type="number" min="1" value={dex} max={maxStats} id="dexStatInput" onChange={dexOnChange} />
      <span>{calculateCost(dex, dex + 1)}</span>
      <span> + {jobBonus.dex}</span>
      <br />
      <label htmlFor="lukStatInput">LUK:</label>
      <input type="number" min="1" value={luk} max={maxStats} id="lukStatInput" onChange={lukOnChange} />
      <span>{calculateCost(luk, luk + 1)}</span>
      <span> + {jobBonus.luk}</span>
      <br />
      <span>Available points: {points}</span>
    </div>
  )
}

export default App
