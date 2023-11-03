import { useState } from "react"
import SignUp from "../components/registration/SignUp"
import SignIn from "../components/registration/SignIn"
import RegistrationCards from "../components/registration/RegistrationCards"

const Portal = () => {
    // default user data
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('I am a general STEM enthusiast')
    const [phase, setPhase] = useState('userSignUp')
    const [userData, setUserData] = useState(null)

    const updateName = (newName) => {
        setName(newName)
    }
    const updatePassword = (newPassword) => {
        setPassword(newPassword)
    }
    const updateUserType = (newType) => {
        setUserType(newType)
    }
    const updatePhase = (newPhase) => {
        setPhase(newPhase)
    }
    const updateUserData = (newData) => {
        setUserData(newData)
    }

    const portalPhases = {
        userSignUp: <SignUp updatePhase={updatePhase} updateUserData={updateUserData} />,
        userSignIn: <SignIn updatePhase={updatePhase} updateUserData={updateUserData} />
    }

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2 bg-gray-200 w-full h-screen rounded-r-3xl flex items-center justify-center">
                {portalPhases[phase]}
            </div>
            <div className="col-span-1 w-full h-screen flex items-center justify-center">
                <RegistrationCards />
            </div>
        </div>
    )
}

export default Portal