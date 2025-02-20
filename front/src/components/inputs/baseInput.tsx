import { forwardRef, HTMLInputTypeAttribute, useEffect, useRef, useState } from "react";
import './baseInput.sass'
import React from "react";
import { FieldError } from "react-hook-form";

export type InputValue = string | number | readonly string[] | undefined;

type props = {
    classes?: string
    title?: string
    value: InputValue
    children?: React.ReactNode
    clickEmitter?: (e: React.MouseEvent<HTMLDivElement>) => any
    valueEmitter?: (e: string) => any
    type: "textfield" | "checkBox"
    style?: Object
    colorType?: "black" | "dimgrey"
    error: FieldError | undefined
    inputType: HTMLInputTypeAttribute
}

const BaseInput = forwardRef<HTMLInputElement, props>(({ inputType = "text", error, colorType = "black", style, type, classes, title, clickEmitter = () => { }, valueEmitter = () => { }, value, children, ...props }, ref) => {
    const [maskWidth, setMaskWidth] = useState(0);
    const [active, setActive] = useState(false);
    const spanRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const setChangeEvent = () => {
        if (inputRef.current) {
            inputRef.current?.addEventListener("input", (e: Event) => {
                handleChange(e);
                (props as any).onChange && (props as any).onChange(e)
            })
        }
    }

    useEffect(() => {
        triggerInputEvent(value)
    }, [value]);

    const maskWidthHandler = () => {
        if (spanRef.current) {
            const rect = spanRef.current.getBoundingClientRect();
            setMaskWidth(rect.width + 7)
        }
    }

    useEffect(() => {
        setChangeEvent()
        maskWidthHandler()

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('input', (e) => {
                    handleChange(e)
                });
            }
        }
    }, []);

    const checkActive = () => {
        if (type == "checkBox") return !!(value as string[]).length
        if (type == "textfield") return active || value !== undefined && value !== ""
    }

    useEffect(() => {
        if (ref) {
            if (typeof ref === 'function') {
                ref(inputRef.current);
            } else {
                ref.current = inputRef.current;
            }
        }
    }, [ref]);

    const triggerInputEvent = (value: any) => {
        if (inputRef?.current) {
            inputRef.current.value = value
            const inputEvent = new Event('input')
            inputRef.current.dispatchEvent(inputEvent)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | Event) => {
        const target = e.target;
        if (target instanceof HTMLInputElement) {
            valueEmitter(target.value)
        }
    };

    const getInputColor = () => {
        if (error) {
            return error && "red"
        }
        return colorType
    }

    const getErrorText = () => {
        if (error) {
            return error.message || error.type
        }
    }



    return (
        <div style={style} className={`${classes} all-wrapper`}>
            <div onClick={(e: React.MouseEvent<HTMLDivElement>) => clickEmitter(e)} className={`input-wrapper ${getInputColor()} ${checkActive() ? "show-value" : ""}`}>
                <div style={{ width: maskWidth }} className={`mask ${!checkActive() ? 'soft-hide' : ''}`}> </div>
                <span>{title}</span>
                <input type={inputType} name={props.name} ref={inputRef} className={`base-input ${type}`} onBlur={(e) => { setActive(false); props?.onBlur && props.onBlur(e) }} onFocus={() => setActive(true)} value={value} />
            </div>
            {error && <span className="error-input">{getErrorText()}</span>}
            {children}
            <span className="get-width-span" ref={spanRef}>{title}</span>
        </div>
    )
})

export default BaseInput