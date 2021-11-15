import { TextFieldContainer } from "../../styles";

const TextField = ({ name, label, type = "text", onChange, value, error, multiline }) => {
  return (
    <TextFieldContainer value={value}>
      <label htmlFor={name}>
        <span className="peer uppercase tracking-wide text-sm cursor-text absolute top-[1.829rem] left-[1.875rem] opacity-0 z-10">
          {label || name}
        </span>
        {multiline ? (
          <textarea
            className="field appearance-none bg-gray-50 hover:bg-white focus:bg-white !border-gray-500 focus:!border-primary-dark peer-hover:!border-primary-dark peer-hover:bg-white leading-relaxed text-xl"
            required
            rows="3"
            id={name}
            name={name}
            type={type}
            onChange={onChange}
            value={value}
          />
        ) : (
          <input
            className="field appearance-none bg-gray-50 hover:bg-white focus:bg-white !border-gray-500 focus:!border-primary-dark peer-hover:!border-primary-dark peer-hover:bg-white leading-relaxed text-xl"
            required
            id={name}
            name={name}
            type={type}
            onChange={onChange}
            value={value}
          />
        )}

        <span className="label uppercase tracking-wide text-sm text-gray-500">{label || name}</span>
        <span className="placeholder peer-hover:!text-primary-dark uppercase tracking-wide text-sm text-gray-500 cursor-text">
          {label || name}
        </span>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </label>
    </TextFieldContainer>
  );
};

export default TextField;
