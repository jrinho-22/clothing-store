import { useForm } from "react-hook-form";
import Button from "../../../components/button/button";
import TextField from "../../../components/inputs/textField/textxField";
import { actions } from "../../../store/reducers";
import User from "../../models/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


type formValuesType = {
    name: string
    // surname: string
    senha: string
    endereco: {
        street: string
        state: string
        city: string
        number: string
    }
    cardInformation: {
        number: string
        expiration: Date
        security: string
    }
}

type props = {
    email: string
}

const SignUpForm = ({ email }: props) => {
    const userModel = new User
    const { register, handleSubmit, formState } = useForm<formValuesType>();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onSubmit = async (data: formValuesType) => {
        const newUser = {
            ...data,
            email: email
        }
        const res = await userModel.post(newUser)
        dispatch(actions.user.setUser(res))
        navigate("/home")
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="group">
                    <TextField error={formState.errors.name} {...register("name", { required: true })} colorType="dimgrey" title="First Name" />
                    {/* <TextField error={formState.errors.surname} {...register("surname", { required: true })} colorType="dimgrey" title="Surname" /> */}
                </div>
                <TextField error={formState.errors.senha} {...register("senha", { required: true, minLength: 8 })} colorType="dimgrey" title="Password" />
                <span className="address">Address</span>
                <TextField error={formState.errors.endereco?.street} {...register("endereco.street", { required: true })} colorType="dimgrey" title="Street" />
                <div className="group">
                    <TextField error={formState.errors.endereco?.state} {...register("endereco.state", { required: true })} colorType="dimgrey" style={{ width: "30%" }} title="State" />
                    <TextField error={formState.errors.endereco?.city} {...register("endereco.city", { required: true })} colorType="dimgrey" style={{ width: "40%" }} title="City" />
                    <TextField inputType="number" error={formState.errors.endereco?.number} {...register("endereco.number")} colorType="dimgrey" style={{ width: "40%" }} title="Number" />
                </div>
                <span className="card-info">Card information</span>
                <TextField error={formState.errors.cardInformation?.number} {...register("cardInformation.number", { required: true })} colorType="dimgrey" title="Number" />
                <div className="group">
                    <TextField error={formState.errors.cardInformation?.expiration} {...register("cardInformation.expiration", { required: true })} colorType="dimgrey" style={{ width: "50%" }} title="Expiration Date" />
                    <TextField error={formState.errors.cardInformation?.security} {...register("cardInformation.security", { required: true })} colorType="dimgrey" style={{ width: "40%" }} title="Security Code" />
                </div>
                <Button buttonType="submit" label="Create Account" type="2"></Button>
            </form>
        </>
    )
}

export default SignUpForm

