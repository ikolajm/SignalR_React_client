interface IncomingProps {
    label: string,
    value: boolean,
    handleChange: any
}

const Checkbox: React.FC<IncomingProps> = ({label, value, handleChange}) => {
    return (
      <label className="passEnabled">
        <input type="checkbox" checked={value} onChange={handleChange} />
        {label}
      </label>
    );
};

export default Checkbox;