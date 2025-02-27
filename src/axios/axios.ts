import axios, { AxiosInstance } from "axios";
import axiosConfig from "./axios.config";
import { SearchBuilders } from "../helpers/filters";
import { filterRecord } from "../hooks/useFilters";


abstract class AxiosIntance<T = any> {
    protected _apiClient: AxiosInstance
    protected _resource: string
    protected _conection: boolean = false

    constructor() {
        this._apiClient = axios.create(axiosConfig);
        this._resource = this.config()
    }

    abstract config(): string 

    static async firstModelInit<T extends AxiosIntance>(this: new (...args: any[]) => T, connected: boolean): Promise<T> {
        const axiosSubClass = new this()
        await axiosSubClass.connect(connected)
        return axiosSubClass
    }

    async connect(connected: boolean) {
        if (connected) return 
        let _conection = false
        while (!_conection) {
            try {
                const response = await this._apiClient.get(this._resource);
                if (response.status === 200) {
                    _conection = true;
                    console.log('Backend connected!');
                }
            } catch (error) {
                console.log('Backend not available yet, retrying...');
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    }

    // interface AxiosResponse<T = any, D = any>  {
    //     data: T;
    //     status: number;
    //     statusText: string;
    //     headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    //     config: InternalAxiosRequestConfig<D>;
    //     request?: any;
    //   }

    async post<payload = T, returnType = T>(data: payload, extraPath?: string): Promise<returnType | null> {
        if (!extraPath) extraPath = ""
        try {
            const response = await this._apiClient.post<returnType>(`${this._resource}/${extraPath}`, data);
            return response.data;
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async get(filterRecord?: filterRecord<T>, extraPath?: string): Promise<T[]> {
        if (!extraPath) extraPath = ""
        try {
            const response = await this._apiClient.get<T[]>(`${this._resource}/${extraPath}`, { timeout: 900000 });
            if (filterRecord) {
                const searchBuilders = new SearchBuilders<T>(response.data, filterRecord)
                return searchBuilders.testFilter()
            }
            return response.data;
        } catch (error) {
            console.log(error)
            return []
        }
    }

    get apiClient() {
        return this._apiClient
    }
}

export default AxiosIntance