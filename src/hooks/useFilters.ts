import { useEffect, useState } from "react";
import AxiosIntance from "../axios/axios"
import { SearchBuilders } from "../helpers/filters";

export type filterRecord<T> = {
    [key in keyof T]?: { value: string[], field: keyof T, rule: "equal" | "contain" }
}

const useFilters = <T>(arg: AxiosIntance<T> | Promise<T[]>, initialRecord: filterRecord<T>) => {
    const [collection, setcollection] = useState<Promise<T[]>>();
    const [filteredCollection, setFilteredCollection] = useState<T[]>();
    const [record, setRecord] = useState<filterRecord<T>>(initialRecord);

    useEffect(() => {
        if (arg instanceof AxiosIntance) {
            setcollection(arg.get())
        } else {
            setcollection(arg)
        }
    }, []);

    // useEffect(() => {
    //     console.log(record, 'recccc')
    // }, [record]);

    const clearRecord = async () => {
        for (let i in record) {
            updateValues(i, [])
        }
        setFilteredCollection(await collection)
    }

    const updateValues = (field: keyof T, value: (string | undefined)[]) => {
        const newValue = value.filter(v => v?.length)
        setRecord(prev => { return { ...prev, [field]: { ...prev[field], value: newValue } } })
    }

    const getFilteredCollection = async () => {
        if (!collection) return []
        const fullfiledCollection = await collection
        console.log(fullfiledCollection, 'fiull')
        const searchBuilders = new SearchBuilders<T>(fullfiledCollection, record)
        const newfilteredCollection = searchBuilders.testFilter()
        setFilteredCollection(newfilteredCollection)
    }
    return { filteredCollection, updateValues, record, clearRecord, getFilteredCollection }
}

export default useFilters

