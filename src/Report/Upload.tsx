import * as React from 'react';
import axios from 'axios';
import { IDocuInput } from './Actions/InputFiles';
import InputFiles from './InputFiles';


const uploadUri = 'https://api-upload-files.azurewebsites.net/api/Archivos';
const run = "https://runindexer.azurewebsites.net/api/Run?code=HtSENFo05A0lx7mg8FNuZbO3DklodaGo7GyIyU47ZRdq4UV9B2JmlQ==";

interface IState {
    filesInput: IDocuInput[]
}

export default class Upload extends React.Component<{},IState>{
    constructor(props: any){
        super(props);
        this.state = {
            filesInput: []
        }
    }

    seeFiles(e: any){
     const files: any = Array.from(e.target.files);
     const data = files.filter(docs => docs.name !== null);
     console.log(data);

     this.setState({
            
     })

    }

    render(){
        return(
            <div>
                <InputFiles />                
                

            </div>
        )
    }

}


/*
import * as React from 'react';
import axios from 'axios';
const uploadUri = 'https://api-upload-files.azurewebsites.net/api/Archivos';
const run = "https://runindexer.azurewebsites.net/api/Run?code=HtSENFo05A0lx7mg8FNuZbO3DklodaGo7GyIyU47ZRdq4UV9B2JmlQ==";

export class Upload extends React.Component {
    state = {
        file: [],
        status: '',
        images: 0,
        archivos: 0,
        loading: false,
        filescount: 0,
        up: 0,
        miarray: [],
        dataprice: [
            {
                name: ''
            }
        ]
    }


        fileSelectedCarImg = event => {
        const file = Array.from(event.target.files);
        const conteo = event.target.files.length;
        
        //console.log("archivos en el array " + this.state.miarray.length)
        this.setState({ filescount: conteo});
        this.setState({ file });
        if(this.state.miarray.length == conteo){
            this.setState({
                miarray: []
            })
        }
        
        

    }

    verArchivos = (event) => {
        console.log(event.target.files)
        event.preventDefault()
        const file = Array.from(event.target.files);
        this.setState({
            dataprice: file,
            status: 'wait'

        })
        
    }

    runIndexer = () =>{
        axios.post(run)
        .then( res =>{
            const respuesta = res.data;
            console.log(respuesta);

        })
    }

    fileUploadCarImg = async () => {
        console.log("upload ");
        
        for (let index = 0; index < this.state.dataprice.length; index++) {
            const element = this.state.file[index];
            const fd = new FormData();
            fd.append('image2', element, element.name)
            //console.log("archivos en el input "+this.state.filescount);
            //console.log("archivos en subidos " + this.state.miarray.length);

            let updata = this.state.filescount;
            let arrayaup = this.state.miarray.length;
        
            

            if (updata !== arrayaup ) {
                //envia post uploadUri 
                await axios.post(uploadUri, fd, {
                onUploadProgress: ProgressEvent => {
                    let porcentaje = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
                    this.setState({
                        up: porcentaje
                    })
                    console.log(porcentaje + '%');
                    this.setState({
                        images: Math.round(ProgressEvent.loaded / ProgressEvent.total * 100),
                    })

                  

                    if (porcentaje === 100) {
                        const newdata = 'ok';

                        if (this.state.miarray.length !== this.state.filescount ) {
                        this.setState({
                            miarray: [...this.state.miarray, newdata]
                        })    
                        }
                        

                    }
                    
                }

            })
                .then(res => {
                    this.setState({
                        status: 'success'

                    })
                });

            }
            
        }
        console.log( "archivos subidos" + this.state.miarray.length);
        console.log( "arvhivos en el input" +this.state.filescount)
        const subidos = this.state.miarray.length;
        const input = this.state.filescount;
        if(subidos == input){
            this.runIndexer();
        }
    }

    


    render() {
         const productComponents = this.state.dataprice.map(item =>
            <tr>
                {item.name}
            </tr>)

        const estados = this.state.miarray.map((value, id) => <tr key={id}>{value}<i className="fa fa-check" style={{ color: "rgb(42, 231, 4)" }} ></i> </tr>)

        return (
            <div>
                <div className="barra">

                



                    <h3>Upload Document</h3>
                    <div>
                        <label className="btn btn-primary btn-sm">
                            <input
                                className="input"
                                id="miArchivo"
                                multiple
                                type="file"
                                onChange={(e) => {
                                    this.fileSelectedCarImg(e);
                                    this.verArchivos(e);
                                }} name='fullname'
                            />
                            <i className="fa fa-cloud-upload" /> Select File
                        </label>

                    </div>
                    <table className="table-sm table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Upload {this.state.images} % </th>
                                <th scope="col">Upload files {this.state.miarray.length}</th>
                            </tr>
                        </thead>

                    </table>
                
                    <button onClick={this.fileUploadCarImg.bind(this)} className="btn btn-success btn-sm" >Upload
                    <i className="fa fa-check"></i>
                    </button>
                    

                </div>
                <div className="divTablew">
                    <table className="table table-sm table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Document</th>
                                <th scope="col">Status</th>
                            </tr>

                        </thead>

                        <td>
                            {productComponents}
                        </td>

                        <td>
                            {estados}
                        </td>
                    </table>
                </div>
            </div>
        )
    }
}

export default Upload





*/


