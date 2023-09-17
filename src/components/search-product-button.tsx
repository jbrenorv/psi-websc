import Button from "@mui/material/Button";

type SearchProductsButtonProps = {
  onClick: () => void;
}

export default function SearchProductsButton(props: SearchProductsButtonProps) {

  return (
    <>
      <div>
        <Button onClick={props.onClick}>Buscar</Button>
      </div>
    </>
  );
}
