import { useForm } from "react-hook-form";
import Button from "../../../components/button/button";
import TextField from "../../../components/inputs/textField/textxField";
import Credential from "../../models/creadentialLookup";
import { useTypesSeletor } from "../../../hooks/typedSelector";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/reducers";
import { useNavigate } from "react-router-dom";

type Props = {
    email?: string
};

type dataType = {
    password: string
}

const PasswordPage = ({ email }: Props) => {
    const credential = new Credential
    const { register, handleSubmit, formState } = useForm<dataType>();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmit = async (data: dataType) => {
        const user = await credential.post<{ password: string }>({ password: data.password }, email)
        if (user) {
            dispatch(actions.user.setUser(user))        
            navigate("/home")
        } else {
            alert("Password incorrect");
        }
    };

    return (
        <form style={{ margin: "-32px 0 0 0" }} onSubmit={handleSubmit(onSubmit)}>
            <span>{email}</span>
            <TextField error={formState.errors.password} {...register("password", { required: true, minLength: 8 })} inputType="password" colorType="dimgrey" title="Password" />
            <Button buttonType="submit" label="Sign In" type="2"></Button>
        </form>
    );
};

export default PasswordPage;