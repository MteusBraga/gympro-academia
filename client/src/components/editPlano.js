import { useForm } from "react-hook-form"
import axios from "axios";
import { useEffect, useState } from "react";

export default function edit({isOpen, setCloseEdit}){
    
    if(isOpen){
        return(
            <div>
                <p>hello</p>
                <button onClick={() => setCloseEdit()}>sair</button>
            </div>
        )
    }

    return null
}