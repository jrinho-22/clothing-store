import { useEffect, useState } from "react"
import "./login.sass"
import SignUpForm from "./components/userForm"
import EntryPage from "./components/entryPage"
import PasswordPage from "./components/passwordPage"

const Login = () => {
    const [curretnPage, setCurrentPage] = useState<"signin" | "form" | "password">("signin")
    const [email, setEmail] = useState<string>("")

    const getMessage = () => {
        switch (curretnPage) {
            case "form":
                return "Let's make you a Member."
            case "signin":
                return "Enter your email to join or sign in."
            case "password":
                return "What's your password?"
        }
    }

    const checkCurrentPage = () => {
        switch (curretnPage) {
            case "form":
                return <SignUpForm email={email} />
            case "signin":
                return <EntryPage emitEmail={(email) => setEmail(email)} emitPage={(v) => setCurrentPage(v)} />
            case "password":
                return <PasswordPage email={email} />
            default:
                return <EntryPage emitEmail={(email) => setEmail(email)} emitPage={(v) => setCurrentPage(v)} />
        }
    }

    return (
        <div className="login-wrapper">
            <div>
                <span className="icon-puma"></span>
                <span className="icon-under-armour"></span>
                <span className="icon-air-jordan"></span>
                <span className="icon-adidas"></span>
            </div>
            <h2>{getMessage()}</h2>
            {checkCurrentPage()}
        </div>
    )
}

export default Login