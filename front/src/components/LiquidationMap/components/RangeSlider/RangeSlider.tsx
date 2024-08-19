import React, {useEffect, useState} from 'react';
import './RangeSlider.css';
import {useDebounceValue} from "$hooks/useDebounce";

const RangeSlider = ({ min, max, step, onChange, range }) => {
    if (max === 0) return <></>
    const [rangeLocal, setRange] = useState(range);
    const value = useDebounceValue(rangeLocal, 500);

    const handleMinChange = (index, event) => {
        const min = parseInt(event.target.value)
        const max = rangeLocal[1]
        if ((max - min) < 100) {
            return
        }
        setRange([min, max]);
    };

    const handleMaxChange = (index, event) => {
        const min = rangeLocal[0]
        const max = parseInt(event.target.value)
        if ((max - min) < 100) {
            return
        }
        setRange([min, max]);
    };

    useEffect(() => {
        onChange(value)
    }, [value]);

    useEffect(() => {
        setRange(range)
    }, [range]);

    return (
        <div className="range-slider">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={rangeLocal[0]}
                onChange={(e) => handleMinChange(0, e)}
                className="thumb thumb-left"
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={rangeLocal[1]}
                onChange={(e) => handleMaxChange(1, e)}
                className="thumb thumb-right"
            />
            <div className="slider-track">
                <div
                    className="track"
                    style={{
                        left: `${((range[0] - min) / (max - min)) * 100}%`,
                        right: `${100 - ((range[1] - min) / (max - min)) * 100}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default RangeSlider;
