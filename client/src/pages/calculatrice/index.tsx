import "../../assets/styles/calculatrice.scss";
import numbers from "../../assets/constants/numbers";
import { useEffect, useState } from "react";
import CalculationPayload from "../../assets/types/calculationPayload";
import CalculationResponse from "../../assets/types/calculationResponse";
import Loader from "../../components/loader";
import Button from "../../components/button/index";
import ButtonVariants from "../../assets/enums/buttonVariants";
import ButtonSizes from "../../assets/enums/buttonSizes";
import ButtonFontSizes from "../../assets/enums/buttonFontSizes";

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
    setResult(0);
  }

  function calculate(): void {
    if (premierNombre && secondNombre) {
      setIsLoading(true);
      const parsedPremierNombre = premierNombre
        ? parseFloat(premierNombre)
        : -1;
      const parsedSecondNombre = secondNombre ? parseFloat(secondNombre) : -1;
      fetch(
        process.env.API_URL
          ? `${process.env.API_URL}/add`
          : "http://localhost:4000/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
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
          setError("");
        })
        .catch((err: Error) => {
          setIsLoading(false);
          setError(err.message);
        });
    }
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
          {!error ? (
            isLoading ? (
              <span className="result-span">
                <Loader />
              </span>
            ) : (
              <span className="result-span">{result ? result : 0}</span>
            )
          ) : (
            <span className="result-span">ERROR</span>
          )}
        </div>
        <div className="container-lower-part">
          <div className="container-keyboard">
            {numbers.map((n: string) => (
              <Button
                variant={ButtonVariants.STANDARD}
                size={ButtonSizes.AU}
                text={n}
                value={n}
                key={n}
                handler={() => handleNumberClick(n)}
                font={ButtonFontSizes.LG}
              />
            ))}
          </div>
          <div className="container-calculation-buttons">
            <Button
              variant={ButtonVariants.PRIMARY}
              size={ButtonSizes.LG}
              text="CLEAR"
              key="clear-button"
              handler={clear}
            />
            <Button
              variant={ButtonVariants.SECONDARY}
              size={ButtonSizes.LG}
              text="DEL"
              key="del-button"
              handler={del}
            />
            <Button
              variant={ButtonVariants.SECONDARY}
              size={ButtonSizes.LG}
              text="+"
              key="plus-button"
              handler={add}
            />
            <Button
              variant={ButtonVariants.SECONDARY}
              size={ButtonSizes.LG}
              text="="
              key="equal-button"
              handler={calculate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculatrice;
