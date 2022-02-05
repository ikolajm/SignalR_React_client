interface IncomingProps {
    forId: string;
    incomingFor: string
    handleChange: any;
    label: string;
    type: string;
    value: string | number;
}

const AuthInput: React.FC<IncomingProps> = ({forId, incomingFor, handleChange, label, type, value}) => {
    return (
        <div className="input-group">
            <label htmlFor={incomingFor} className="form-label">{label}:</label>
            <input id={forId} type={type} className="form-control" onChange={e => handleChange(e.target.value)} value={value} />
        </div>
    );
}

export default AuthInput;