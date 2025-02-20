import { valueLabel } from "../../../interfaces/IInputs";
import "./radioField.sass"

type props = {
    collection?: valueLabel[]
    register: any
    name: string
};

const RadioField = ({ collection = [], register, name }: props) => {

    return (
        <div className="radio-wrapper">
            {collection.map((col) =>
                <div>
                    <input {...register(name)} id={col.label} value={col.label} type="radio" name={name} />
                    <label htmlFor={col.label}>{col.label}</label>
                </div>
            )}
        </div>
    );
};

export default RadioField;