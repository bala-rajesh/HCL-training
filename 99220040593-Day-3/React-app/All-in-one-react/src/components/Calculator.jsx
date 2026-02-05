import React, { useState } from 'react';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operation, setOperation] = useState(null);
    const [waitingForNewValue, setWaitingForNewValue] = useState(false);

    const handleNumber = (num) => {
        if (waitingForNewValue) {
            setDisplay(String(num));
            setWaitingForNewValue(false);
        } else {
            setDisplay(display === '0' ? String(num) : display + num);
        }
    };

    const handleDot = () => {
        if (waitingForNewValue) {
            setDisplay('0.');
            setWaitingForNewValue(false);
            return;
        }
        if (!display.includes('.')) {
            setDisplay(display + '.');
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(false);
    };

    const calculate = (a, b, op) => {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    };

    const handleOperator = (op) => {
        const value = parseFloat(display);

        if (operation && !waitingForNewValue) {
            const result = calculate(previousValue, value, operation);
            setDisplay(String(result));
            setPreviousValue(result);
        } else {
            setPreviousValue(value);
        }

        setOperation(op);
        setWaitingForNewValue(true);
    };

    const handleEqual = () => {
        if (!operation || waitingForNewValue) return;

        const value = parseFloat(display);
        const result = calculate(previousValue, value, operation);

        setDisplay(String(result));
        setPreviousValue(null);
        setOperation(null);
        setWaitingForNewValue(true);
    };

    const Button = ({ label, onClick, className = '' }) => (
        <button
            onClick={onClick}
            className={`glass-btn ${className}`}
            style={{
                fontSize: '1.25rem',
                padding: '1rem',
                margin: '5px',
                minWidth: '60px',
                flex: 1,
                background: ['C', '/', '*', '-', '+', '='].includes(label)
                    ? 'rgba(255, 255, 255, 0.25)'
                    : 'rgba(255, 255, 255, 0.1)',
                fontWeight: ['=', '+', '-', '*', '/'].includes(label) ? 'bold' : 'normal'
            }}
        >
            {label}
        </button>
    );

    return (
        <div className="glass-panel fade-in delay-1" style={{ maxWidth: '320px', margin: '2rem auto', padding: '1.5rem' }}>
            <div
                className="glass-input"
                style={{
                    marginBottom: '1.5rem',
                    textAlign: 'right',
                    fontSize: '2rem',
                    padding: '1rem',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    overflow: 'hidden'
                }}
            >
                {display}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                <Button label="C" onClick={handleClear} className="" />
                <Button label="" onClick={() => { }} className="" />
                <Button label="" onClick={() => { }} className="" />
                <Button label="/" onClick={() => handleOperator('/')} />

                <Button label="7" onClick={() => handleNumber(7)} />
                <Button label="8" onClick={() => handleNumber(8)} />
                <Button label="9" onClick={() => handleNumber(9)} />
                <Button label="*" onClick={() => handleOperator('*')} />

                <Button label="4" onClick={() => handleNumber(4)} />
                <Button label="5" onClick={() => handleNumber(5)} />
                <Button label="6" onClick={() => handleNumber(6)} />
                <Button label="-" onClick={() => handleOperator('-')} />

                <Button label="1" onClick={() => handleNumber(1)} />
                <Button label="2" onClick={() => handleNumber(2)} />
                <Button label="3" onClick={() => handleNumber(3)} />
                <Button label="+" onClick={() => handleOperator('+')} />

                <Button label="0" onClick={() => handleNumber(0)} className="" style={{ gridColumn: 'span 2' }} />
                <Button label="." onClick={handleDot} />
                <Button label="=" onClick={handleEqual} />
            </div>
        </div>
    );
};

export default Calculator;
