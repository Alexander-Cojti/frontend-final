import *as React from 'react';

interface Iprops{
    status: number;
}

export default class ProgressBar extends React.Component<Iprops, any> {
    render() {
        return (

            <div className="progress">
                <div 
                className="progress-bar progress-bar-animated bg-success" 
                 role="progressbar"
                style={{width: `${this.props.status}%`}} 
                
                >
                {this.props.status}%
                </div>            
            </div>
        )
    }
}