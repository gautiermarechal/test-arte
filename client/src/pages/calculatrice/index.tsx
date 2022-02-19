import "../../assets/styles/calculatrice.css";
import numbers from "../../assets/constants/numbers";
import { useEffect, useState } from "react";
import CalculationPayload from "../../assets/types/calculationPayload";
import CalculationResponse from "../../assets/types/calculationResponse";
import { ReactComponent as DeleteLogo } from "../../assets/images/delete.svg";
import { ReactComponent as ClearLogo } from "../../assets/images/clear.svg";

function Calculatrice() {
  const [premierNombre, setPremierNombre] = useState<string | undefined>(
    undefined
  );
  const [secondNombre, setSecondNombre] = useState<string | undefined>(
    undefined
  );
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const [result, setResult] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [inputDisplay, setInputDisplay] = useState<string>("");

  useEffect(() => {
    if (!premierNombre) {
      setInputDisplay("");
    }

    if (premierNombre && !isAdded && !secondNombre) {
      setInputDisplay(premierNombre.toString());
    }

    if (premierNombre && isAdded && !secondNombre) {
      setInputDisplay(`${premierNombre} +`);
    }

    if (premierNombre && isAdded && secondNombre) {
      setInputDisplay(`${premierNombre} + ${secondNombre}`);
    }
  }, [premierNombre, isAdded, secondNombre]);

  function handleNumberClick(n: string): void {
    if (!isAdded) {
      setPremierNombre(premierNombre ? premierNombre + n : n);
    } else {
      setSecondNombre(secondNombre ? secondNombre + n : n);
    }
  }

  function add(): void {
    if (premierNombre && !secondNombre) {
      setIsAdded(!isAdded);
    }
  }

  function del(): void {
    if (secondNombre) {
      setSecondNombre(secondNombre.slice(0, -1));
    } else if (isAdded) {
      setIsAdded(false);
    } else if (premierNombre) {
      setPremierNombre(premierNombre.slice(0, -1));
    }

    setInputDisplay(inputDisplay.slice(0, 1));
  }

  function clear(): void {
    setPremierNombre(undefined);
    setSecondNombre(undefined);
    setIsAdded(false);
  }

  function calculate(): void {
    setIsLoading(true);
    const parsedPremierNombre = premierNombre ? parseFloat(premierNombre) : -1;
    const parsedSecondNombre = secondNombre ? parseFloat(secondNombre) : -1;
    fetch(
      process.env.API_URL
        ? `${process.env.API_URL}/add`
        : "http://localhost:4000/add",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          premierNombre: parsedPremierNombre,
          secondNombre: parsedSecondNombre,
        } as CalculationPayload),
      }
    )
      .then((res) => res.json())
      .then((json: CalculationResponse) => {
        setResult(json.resultat);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setIsLoading(false);
        setError(err.message);
      });
  }
  return (
    <div className="main">
      <div className="container-calculatrice">
        <div className="container-input">
          <input
            type="text"
            className="input-calculatrice"
            value={inputDisplay}
            disabled
          />
          <span className="result-container">{result ? result : 0}</span>
        </div>
        <div className="container-lower-part">
          <div className="container-keyboard">
            {numbers.map((n: string) => (
              <button
                onClick={() => handleNumberClick(n)}
                key={n}
                className="number-button"
                value={n}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="container-calculation-buttons">
            <button className="plus-button" onClick={del}>
              <DeleteLogo width={10} height={10} />
            </button>
            <button className="plus-button" onClick={add}>
              +
            </button>
            <button className="equal-button">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculatrice;
