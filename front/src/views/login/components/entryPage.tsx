import { useForm } from "react-hook-form";
import Button from "../../../components/button/button";
import TextField from "../../../components/inputs/textField/textxField";
import Credential from "../../models/creadentialLookup";

type Props = {
    emitPage: (v: "form" | "password") => any
    emitEmail: (email: string) => any
};

type dataType = {
    email: string
}

const EntryPage = ({ emitPage, emitEmail }: Props) => {
    const credential = new Credential
        const { register, handleSubmit, formState } = useForm<dataType>();

    const onSubmit = async (data: dataType) => {
        const res = await credential.post<{ email: string }, { challenge: "password" }>({ email: data.email })
        emitEmail(data.email)
        res == null && emitPage("form")
        if (res && 'challenge' in res && res.challenge == "password") {
            emitPage("password")
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField error={formState.errors.email} {...register("email", { required: true, pattern: /^[\w]+@/i })} colorType="dimgrey" title="E-mail" />
            <span>By continuing, I agree to Privacy Policy and Terms of Use.</span>
            <Button buttonType="submit" label="Continue" type="2"></Button>
        </form>
    );
};

export default EntryPage;