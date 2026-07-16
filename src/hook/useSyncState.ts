import { useState } from "react";

export const useSyncState = <T>(initialValue : T) => {
    const [_state, _setState] = useState({ current: initialValue });

    const getState =() : T=> {
        return _state.current;
    };
    const setState = (value : T) => {
        _setState({ current: value }); // triggers re-render
        _state.current = value; // makes update immediate
    }

return [getState, setState]; 

}