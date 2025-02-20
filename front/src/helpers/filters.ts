import { filterRecord } from "../hooks/useFilters"

export class SearchBuilders<T> {
    collection: T[]
    record: filterRecord<T>

    constructor(collection: T[], record: filterRecord<T>) {
        this.collection = collection 
        this.record = record
    }

    setCurrent(key: keyof T, coll: T){
        const _searchValues = this.record[key]!.value.join("|")
        return({_collValues: this.getCollectionValues(coll[key]),
        _regexRule: this.setRegex(this.record[key]!.rule, _searchValues)
        })
    }

    getCollectionValues(values: any): string {
        if(Array.isArray(values)) return values.map(s => `<${s}>`).join("")
        if(typeof values == 'string') return "<" + values + ">"
        return ""
    }

    setRegex(rule: "contain" | "equal", _searchValues: string) {
        if(rule == "contain") return new RegExp(`<.*${_searchValues}.*?>`, "i")
        if(rule == "equal") return new RegExp(`<${_searchValues}>`, "i")
    }

    testFilter(){
        return this.collection.filter(coll =>{
            let passed = true
            for (let i in this.record) {
                if (!this.record[i]?.value.length) continue
                const current = this.setCurrent(i, coll)
                if(!current._regexRule!.test(current._collValues)) passed = false
            }
            return passed
        })
    }

    static checkEmptyFIlter = (record: filterRecord<any>) => {
        return Object.values(record).every((rec: any) => !rec.value.length)
    }
}