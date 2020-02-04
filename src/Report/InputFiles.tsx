import * as React from 'react';
import { UpFiles } from './Actions/UpFile';
import axios from 'axios';
import { IStatus } from './Actions/Status';
import { CircularProgress, LinearProgress } from 'material-ui';
import { Check, PhotoSizeSelectActual, CloudUpload } from 'material-ui-icons'
import UploadDialog from './Actions/UploadDialog';
import ProgressBar from './Actions/ProgressBar';
import ProcessIndex from './Actions/ProcessIndex';
const uploadUri = 'https://api-upload-files.azurewebsites.net/api/Archivos';
const run = "https://runindexer.azurewebsites.net/api/Run?code=HtSENFo05A0lx7mg8FNuZbO3DklodaGo7GyIyU47ZRdq4UV9B2JmlQ==";
const getStatus = 'https://paginacion.azurewebsites.net/api/status';



interface IState {
    data: Array<string>;
    file: Array<any>;
    docus: IStatus[];
    up: number;
    upDocs: Array<string>;
    loading: Array<string>;
    filesInput: number;
    runState: string;

}

export default class InputFiles extends React.Component<{}, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            file: [],
            docus: [],
            up: 0,
            upDocs: ["mau", "juan", "jajaj"],
            loading: [],
            filesInput: 0,
            runState: ''
        }
    }

    componentDidMount() {

    }

    onFileChange(e: any) {
        const datos = [];
        Array.prototype.forEach.call(e.target.files, file => datos.push(file.name))
        this.setState({
            file: e.target.files,
            data: datos,
            filesInput: 0      
        })
    }

    async onSubmit(e: any) {
        e.preventDefault();
        var formData = new FormData();
        for (const key of Object.keys(this.state.file)) {
            formData.append('file', this.state.file[key])
        }
        this.state.filesInput == 100 ? null :
        await axios.post(uploadUri, formData, {
            onUploadProgress: ProgressEvent => {
                let porcentaje = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
                this.setState({ filesInput: porcentaje })
            }
        }).then(res => {
            console.log(res.data)
            res.status == 200? this.runIndexer(): null;
        })
    }


    runIndexer = async () => {
        await axios.post(run)
            .then(res => {
                const respuesta = res.data;
                console.log(respuesta);
                respuesta != null ? this.setState({ runState: '' }) : null;
            })
        //this.waitDocs();
    }


    render() {


        return (
            <div className="container ">

                <div className="row p-4">

                    <div className="col-md-4">
                        <form onSubmit={(e) => this.onSubmit(e)}>
                            <div className="card card-body border-primary mb-3">
                                <div className="form-group">
                                    <label className="btn btn-success btn-sm">
                                        Select Files <PhotoSizeSelectActual />
                                        <input
                                            style={{ display: 'none' }}
                                            type="file" name="imgCollection"
                                            onChange={(e) => this.onFileChange(e)} multiple />
                                    </label>
                                    {this.state.filesInput != 0 && this.state.filesInput !=100? 
                                    <div className="form-group"> 
                                    <button className="btn btn-danger ">
                                        Run <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </button>
                                    </div> : <div className="form-group">
                                            <button className="btn btn-primary btn-sm" type="submit">Upload <CloudUpload /> </button>
                                        </div>}
                                    <div >
                                        {this.state.filesInput != 0 ? <ProgressBar status={this.state.filesInput} /> : null}
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div>                            
                        </div>
                    </div>
                </div>
                <div className="col-md-10">
                    <ProcessIndex />
                    <div className="card">
                        <div className="container-fluid">
                        <table className="table table-sm table-borderless table-responsive">
                                <thead>
                                    <th >Name Document</th>
                                </thead>
                                <tbody>
                                    {this.state.data.map((item) => {
                                        return <tr key={item}><td>{item.substring(0, 30)}</td></tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

//cambiar guatemala 
//nombre usuario ala par del logaout
//logos pasarlos a blanco 
//buscar solo por nombre archivo


/*
import * as React from 'react';
import { UpFiles } from './Actions/UpFile';
import axios from 'axios';
import { IStatus } from './Actions/Status';
import { CircularProgress, LinearProgress } from 'material-ui';
import {  Check, PhotoSizeSelectActual} from 'material-ui-icons'
import UploadDialog from './Actions/UploadDialog';
const uploadUri = 'https://api-upload-files.azurewebsites.net/api/Archivos';
const run = "https://runindexer.azurewebsites.net/api/Run?code=HtSENFo05A0lx7mg8FNuZbO3DklodaGo7GyIyU47ZRdq4UV9B2JmlQ==";
const getStatus ='https://paginacion.azurewebsites.net/api/status';

interface IState {
    data: Array<string>;
    file: Array<any>;
    docus: IStatus[];
    up: number;
    upDocs: Array<string>;
    loading: Array<string>;
    filesInput: number;
    runState: string;
}

export default class InputFiles extends React.Component<{}, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            data: [],
            file: [],
            docus: [],
            up: 0,
            upDocs: [],
            loading: [],
            filesInput: 0,
            runState: ''
        }
    }

    componentDidMount(){
        this.waitDocs();
        this.runIndexer();
    }

    componentWillUnmount(){
        setTimeout(() => console.log("presionandose"),1000)
    }

    handleChange(e: any) {
        const arrayfiles = e.target.files;
        const numberFiles = e.target.files.length;

        if(this.state.filesInput === this.state.upDocs.length){
            this.setState({ upDocs: []})
        }
        let arraylist = [];

        Object.keys(arrayfiles).forEach(key => {
            arraylist.push(arrayfiles[key].name)
            //console.log(arraylist);
            this.setState({
                data: arraylist,
                filesInput: numberFiles
            })
        });
    }

    fileUpload = async () => {

        for (let index = 0; index < this.state.file.length; index++) {
            const element = this.state.file[index];
            const fd = new FormData();
            fd.append('image2', element, element.name);

            const upDocsCloud = this.state.upDocs.length;
            const inputDocs = this.state.data.length;
            console.log('datos arriba' + upDocsCloud + 'datos en el input'+inputDocs)
            if( upDocsCloud == inputDocs){
                    this.runIndexer();
            }

            if(upDocsCloud != inputDocs){

            await axios.post(uploadUri, fd, {
                onUploadProgress: ProgressEvent => {
                    let porcentaje = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
                    const newData = ' ';
                    this.setState({
                        up: porcentaje,
                        runState: 'waiting'
                    })
                    porcentaje == 100 ? this.setState({
                        upDocs: [...this.state.upDocs, newData]
                    }): null;
                }
            }).then(res => {
                console.log(res.data);
            })

        }
      }
    }

    //e: React.ChangeEvent<HTMLInputElement>
    fileSelectedCarImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = Array.from(e.target.files);
        this.setState({ file })
    }

    runIndexer = async() => {
        await axios.post(run)
            .then(res => {
                const respuesta = res.data;
                respuesta != null? this.setState({runState: ''}): null;
            })
            this.waitDocs();
            }





    waitDocs = async() =>{
        await axios.get(getStatus)
        .then(res => {
                const data = res.data;
                console.log(data);
                const numerFiles = res.data.results.length;
                const newData = 'loading';
                let arrayLoad = [];
                for (let index = 0; index < numerFiles; index++) {
                   arrayLoad  = [...arrayLoad, newData]
                }
                this.setState({
                    docus: data.results,
                    loading: arrayLoad
                })
            }
        )
    }




    render() {
        const timer = this.state.upDocs.length !== 0? setTimeout(() => this.waitDocs(), 90000): null;
        const docsload = this.state.loading.map(item =>
            <tr key={item}>
                {item}<CircularProgress size={15} color="secondary" thickness={7}/>
            </tr>)

        const docsInInput = this.state.data.map(item =>
            <tr key={item}>
                {item}
            </tr>)
         const docsState = this.state.upDocs.map((data)=>
            <tr key={data}>
                {data} <Check style={{color: "green"}}/>
            </tr>)
        const indexStatus = this.state.docus.map((docs) =>
            <tr key={docs.id}>

                {docs.NombreDocumento} {new Date().getMinutes() - new Date(docs.FechaInsercion).getMinutes() >= 5 || new Date().getMinutes() - new Date(docs.FechaInsercion).getMinutes() <= -5? <button onClick={this.runIndexer.bind(this)}>Retryve</button>: null  }
            </tr>
        )
//{new Date().getMinutes() - new Date(docs.FechaInsercion).getMinutes() >= 1 && new Date().getMinutes() - new Date(docs.FechaInsercion).getMinutes() <= -1 ? <button onClick={() => console.log('run Otra vez')}> retryve</button> : null}
        const wait = this.state.runState !== ''?  <button className="btn btn-danger btn-sm" type="button" >
                                                {this.state.runState}
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </button>: null;

        return (
            <div >


                <div className="container p-4">
                    <div className="row">
                        <div className="col-md-4 ">

                            <div className="card card-body border-primary mb-3">

                                <div >
                                    <label  className="btn btn-success btn-sm">
                                         Select Files <PhotoSizeSelectActual />
                                        <input
                                        type="file"
                                        multiple
                                        style={{display: 'none'}}
                                        onChange={(e) => {this.fileSelectedCarImg(e), this.handleChange(e)}}
                                    />
                                    </label>
                                      <UploadDialog
                                fileUpload={this.fileUpload.bind(this)}
                                />
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="container p-6">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card card-body">
                                <table className="table table-sm responsive">
                                    <thead>
                                            <h5>Upload Files   {this.state.up}% </h5>
                                            {wait}
                                        <tr>
                                            <th scope="col">Nombre Documento</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <td >{docsInInput}</td>
                                        <td>{docsState}</td>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-body">
                                <table className="table table-sm responsive">
                                    <thead>
                                        <h4>Process In Document</h4>
                                        <tr>
                                            <th scope="col">Nombre Documento</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                                <td>{indexStatus}
                                                </td>
                                                <td>{docsload}
                                                </td>

                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}





*/
