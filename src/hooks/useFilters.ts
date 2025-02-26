import { useEffect, useState } from "react";
import AxiosIntance from "../axios/axios"
import { SearchBuilders } from "../helpers/filters";

export type filterRecord<T> = {
    [key in keyof T]?: { value: string[], field: keyof T, rule: "equal" | "contain" }
}

const useFilters = <T>(arg: AxiosIntance<T> | Promise<T[]>, initialRecord: filterRecord<T>) => {
    const [defaultCollection, setDefaultCollection] = useState<Promise<T[]>>();
    const [record, setRecord] = useState<filterRecord<T>>(initialRecord);

    useEffect(() => {
        if (arg instanceof AxiosIntance) {
            setDefaultCollection(arg.get())
        } else {
            setDefaultCollection(arg)
        }
    }, []);

    // useEffect(() => {
    //     console.log(record, 'recccc')
    // }, [record]);

    const clearRecord = async () => {
        for (let i in record) {
            updateValues(i, [])
        }
        // setFilteredCollection(await collection)
    }

    const updateValues = (field: keyof T, value: (string | undefined)[]) => {
        const newValue = value.filter(v => v?.length)
        setRecord(prev => { return { ...prev, [field]: { ...prev[field], value: newValue } } })
    }

    const getFilteredCollection = async () => {
        if (!defaultCollection) return []
        const fullfiledCollection = await defaultCollection
        const searchBuilders = new SearchBuilders<T>(fullfiledCollection, record)
        const newfilteredCollection = searchBuilders.testFilter()
        // setFilteredCollection(newfilteredCollection)
        return newfilteredCollection
    }
    return { defaultCollection, updateValues, record, clearRecord, getFilteredCollection }
}

export default useFilters

