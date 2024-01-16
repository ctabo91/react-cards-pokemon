import {useState, useEffect} from "react";
import axios from "axios";


const useFlip = () => {
    const [state, setState] = useState(true);
    const toggleState = () => {
        setState(state => !state);
    }
    return [state, toggleState];
}


const useAxios = (keyInLS, baseUrl) => {
    const [responses, setResponses] = useLocalStorage(keyInLS);
    const [error, setError] = useState(null);

    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
        try {
            const res = await axios.get(`${baseUrl}${restOfUrl}`);
            setResponses(data => [...data, formatter(res.data)]);
        } catch (error) {
            setError(error);
        }
    };

    const clearResponses = () => setResponses([]);

    return [responses, addResponseData, clearResponses, error];
};


const useLocalStorage = (key, initialValue = []) => {
    if (localStorage.getItem(key)) {
        initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
}


export {useFlip, useAxios, useLocalStorage};