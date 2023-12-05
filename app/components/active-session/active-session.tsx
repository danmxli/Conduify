import React, { FC, useState } from "react"

interface ActiveSessionProps {
    updatePhase: (newPhase: string) => void;
}

const ActiveSession: FC<ActiveSessionProps> = (props): JSX.Element => {
    return (
        <div>
            hi
        </div>
    )
}

export default ActiveSession