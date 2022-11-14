import React, { Component } from "react";
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [null, null],
    current: 0
}

export default class Calculator extends Component {
    
    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0 || this.state.operation === '=') {
            if (this.state.values[0] === null) {
                this.setState({ operation: null, current: 0,  clearDisplay: true})
            } else {
                if (this.state.values[0] === null && this.state.values[1] === null) {
                    this.setState({ operation, current: 0,  clearDisplay: true})
                } else {
                    this.setState({ operation, current: 1,  clearDisplay: true})
                }
                
            }
        } else {
            const equals = operation === "="
            const currentOperation = this.state.operation
            let result = null

            const trueOrFalse = this.state.operation != null && this.state.values[1] === null
            const values = [...this.state.values]
            switch(currentOperation) {
                case '/':
                    if (trueOrFalse) {
                        result = values[0] / values[0]
                    } else {
                        result = values[0] / values[1]
                    }
                    break;
                case '*':
                    if (trueOrFalse) {
                        result = values[0] * values[0]
                    } else {
                        result = values[0] * values[1]
                    }
                    break;
                case '-':
                    if (trueOrFalse) {
                        result = values[0] - values[0]
                    } else {
                        result = values[0] - values[1]
                    }
                    break;
                case '+':
                    if (trueOrFalse) {
                        result = values[0] + values[0]
                    } else {
                        result = values[0] + values[1]
                    }
                    break;
                default:
                    result = 'ERRO'
            }
            
            values[0] = result
            values[1] = null
        
            if (isNaN(values[0]) || !isFinite(values[0])) {
                values[0] = 0
            }
            
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        
        const clearDisplay = this.state.displayValue ==='0' 
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})

        if (n !=='.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }
    
    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}