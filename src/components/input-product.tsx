import Input from "@mui/material/Input";

type InputProductProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function InputProduct(props: InputProductProps) {

  const onChange = (event: any) => {
    props.onChange(event.target.value);
  }

  return (
    <>
      <div>
        <Input
          type="text"
          placeholder="Nome do produto"
          value={props.value}
          onChange={onChange}
        />
      </div>
    </>
  );
}
