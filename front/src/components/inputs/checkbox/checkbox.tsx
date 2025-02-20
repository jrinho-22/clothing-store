import { forwardRef, useEffect, useRef, useState } from "react"
import "./checkbox.sass"
import BaseInput from "../baseInput"
import { valueLabel } from "../../../interfaces/IInputs"

type props = {
    title: string
    collection: valueLabel[]
    classes?: string
    emitter?: (param: string[]) => void
    value: any[] | undefined
}

const CheckBox = forwardRef<HTMLInputElement, props>(({
    collection = [],
    classes,
    title,
    emitter,
    value: newValue,
    ...props
}, ref) => {
    const [showDrop, setShowDrop] = useState<boolean>(false);
    const [showValue, setShowValue] = useState<{ value: valueLabel[], newValue: boolean }>({ value: [], newValue: false });
    let dropDownInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (ref) {
            if (typeof ref === 'function') {
                ref(dropDownInputRef.current);
            } else if (ref && 'current' in ref) {
                (ref as React.MutableRefObject<HTMLInputElement | null>).current = dropDownInputRef.current;
            }
        }
    }, [ref]);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropDownInputRef.current !== event.target) {
            setShowDrop(false)
        }
    };

    const handleInputClick = (event: any) => {
        setShowDrop(!showDrop);
    };

    const checkCollection = (coll: valueLabel, item: valueLabel) => {
        return coll.label == item.label && item.value == coll.value
    }

    const handleDropdownClick = (item: valueLabel) => {
        if (!showValue.value.some(coll => checkCollection(coll, item))) {
            setShowValue(prev => { return { value: [...prev.value, item], newValue: false } })
        } else {
            setShowValue(prev => { return { value: prev.value.filter(coll => !checkCollection(coll, item)), newValue: false } })
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // console.log(collection, 'collection')
        if (!newValue) {
            setShowValue({ value: [], newValue: true })
        } else {
            setShowValue({
                value: collection.filter(coll => {
                    return newValue.includes(coll.value)
                }), newValue: true
            })
        }
    }, [newValue, collection])

    useEffect(() => {
        emitter && !showValue.newValue && emitter(showValue.value.map(valueCol => valueCol.value))
    }, [showValue])

    const getAllLabels = () => {
        return showValue.value.map(value => " " + value.label)
    }

    return (
        <BaseInput {...props} classes={classes} title={title} ref={dropDownInputRef} type="checkBox" value={getAllLabels()} clickEmitter={handleInputClick}>
            <div onClick={(e) => e.stopPropagation()} className={`dropdown-wrapper ${showDrop ? "show-drop" : ""}`}>
                {collection.map(coll =>
                    <div className="checkbox-wrapper" onClick={() => handleDropdownClick(coll)}>
                        <div className="checkbox">
                            {showValue.value.some(item => checkCollection(item, coll)) &&
                                <span className="i-check"></span>
                            }
                        </div>
                        <span>{coll.label}</span>
                    </div>
                )}
            </div>
        </BaseInput>
    )
})

export default CheckBox