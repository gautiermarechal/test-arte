import { ReactElement, useEffect, useState } from "react";
import Logos from "../../assets/enums/logos";
import ButtonProps from "../../assets/types/buttonProps";
import { ReactComponent as DeleteLogo } from "../../assets/images/delete.svg";
import "../../assets/styles/button.scss";

function Button(props: ButtonProps) {
  const [logo, setLogo] = useState<ReactElement | undefined>(undefined);

  useEffect(() => {
    if (props.logo) {
      switch (props.logo) {
        case Logos.DELETE_LOGO:
          setLogo(<DeleteLogo width={10} height={10} />);
          break;
        default:
          break;
      }
    }
  }, [props.logo]);

  return (
    <button
      className={`pushable pushable-${props.variant} ${props.size}`}
      onClick={props.handler}
    >
      {logo ? (
        <span className={`front front-${props.variant} ${props.font}`}>
          {logo}
        </span>
      ) : (
        <span className={`front front-${props.variant} ${props.font}`}>
          {props.text}
        </span>
      )}
    </button>
  );
}

export default Button;
