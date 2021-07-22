import React from 'react'

function filterFalsy(obj) {
    return Object.entries(obj).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
}

function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
        const stickyValue = window.localStorage.getItem(key)
        return stickyValue !== null
            ? Object.assign({}, defaultValue, JSON.parse(stickyValue))
            : defaultValue
    })
    React.useEffect(() => {
        if(value)
            window.localStorage.setItem(key, JSON.stringify(filterFalsy(value)))
        else
            window.localStorage.removeItem(key)
    }, [key, value])
    return [value, setValue]
}

export default useStickyState