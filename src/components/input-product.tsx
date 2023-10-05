import { TextField } from "@mui/material";

type InputProductProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function InputProduct(props: InputProductProps) {

  const onChange = (event: any) => {
    props.onChange(event.target.value);
  }

  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="search"
      placeholder="Nome do produto"
      value={props.value}
      size="small"
      fullWidth
      autoComplete="off"
      onChange={onChange}
    />
  );
}
