import *as React from 'react';
import { ArrowDropDown } from 'material-ui-icons'
import axios from 'axios';
import { IStatus } from './Status';
const getStatus = 'https://paginacion.azurewebsites.net/api/status';

interface IProcess{

}

interface IProcesState{
    docus: IStatus[]
}
export default class ProcessIndex extends React.Component<any,IProcesState> {
        constructor(props: any){
            super(props);
            this.state ={
                docus: []
            }
        }

        componentDidMount(){
            this.waitDocs();
        }

    waitDocs = async() =>{
        await axios.get(getStatus)
        .then(res => {
                const data = res.data;                
                const numerFiles = res.data.results.length;
                const newData = 'loading';
                let arrayLoad = [];
                for (let index = 0; index < numerFiles; index++) {
                   arrayLoad  = [...arrayLoad, newData]
                }
                this.setState({
                    docus: data.results
                })
            }
        )
    }
    render(){
        return(

            <div>
                <p>
                    <label className="btn-group btn-group-toggle">
                    <a className="btn btn-outline-primary" onClick={this.waitDocs} data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Document processing   <ArrowDropDown />
                    </a>
                    {/* <button className="btn btn-primary btn-sm" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                       
                    </button> */}
                    </label>
                    <div className="collapse" id="collapseExample">
                        <div className="card card-body">
                        <table className="table table-sm table-borderless table-responsive">
                                    <thead>                                                                                        
                                        <tr>
                                            <th scope="col">Nombre Documento</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                          {this.state.docus.map(docs => 
                                              <tr key={docs.id}>
                                                <td>{docs.NombreDocumento}</td>
                                              </tr>
                                          )}  
                                        
                                        </tbody>
                            </table>
                        </div>
                    </div>
                </p>
            </div>
        )
    }
}