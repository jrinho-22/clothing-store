import { forwardRef, HTMLInputTypeAttribute, useEffect, useState } from "react";
import BaseInput from "../baseInput";
import { FieldError } from "react-hook-form";

type props = {
    title: string
    classes?: string
    emitter?: (value: string) => any
    value?: string | undefined
    style?: Object
    colorType?: "black" | "dimgrey"
    error?: FieldError | undefined
    inputType?: HTMLInputTypeAttribute
}

const TextField = forwardRef<any, props>(({ inputType = "text", error, colorType, style, classes, emitter, title, value: newValue, ...props }: props, ref) => {
    const [value, setValue] = useState<{value: string, newValue: boolean}>({value: "", newValue: false})
    
    const valueChange = (v: string) => {
        setValue({value: v, newValue: false})
    }

    useEffect(() => {
        if (!newValue) {
            setValue({value: "", newValue: true})
        } else {
            setValue({value: newValue, newValue: true})
        }
    }, [newValue])

    useEffect(() => {
        emitter && !value.newValue && emitter(value.value)
    }, [value])

    return (
        <BaseInput inputType={inputType} error={error} {...props} ref={ref} colorType={colorType} style={style} title={title} type="textfield" classes={classes} value={value.value} valueEmitter={valueChange} />
    )
})

export default TextField