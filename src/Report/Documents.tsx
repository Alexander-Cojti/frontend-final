import * as React from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import DocumentList from "./DocumentList";
import { IDocu } from "./Docu";
import { IObjectDelete } from "./ObjDelete";
import { stat } from "fs";
import { Delete, SkipNext, SkipPrevious, FirstPage } from "material-ui-icons";
import DeleteDialog from "./Actions/DeleteDialog";

const Docs = "https://cosmo-rest-api-get.azurewebsites.net/api/Documentos";
const UriDelete =
  "https://cosmo-rest-api-delete.azurewebsites.net/api/documentos/";
const DeleteAll =
  "https://cosmo-rest-api-delete.azurewebsites.net/api/DeleteAllDocBlobs?code=mCIXOoiAAL7ai5NlYMAN5mrSdcR522yX7Ao5NIesKPKNhiNvWkBdMQ==";
const uriDownload = "https://blobstoragedq.azurewebsites.net/api/DownloadBlob/";

const uridocs = "https://paginacion.azurewebsites.net/api/documents";
const deleteobj = "https://deletearray.azurewebsites.net/api/documents";

interface IPropsDocument { }

interface IStateDocument {
  docus: IDocu[];
  paginToken: string;
  urldocs: string;
  docsId: string[];
  idObjects: IDocu[];
  idToken: string[];
}

export default class Documents extends React.Component<
  IPropsDocument,
  IStateDocument
  > {
  constructor(props: IPropsDocument) {
    super(props);
    this.state = {
      docus: [],
      paginToken: "",
      urldocs: uridocs,
      docsId: [],
      idObjects: [],
      idToken: [null]
    };
  }

  componentDidMount() {
    this.getDocs(null, null);
  }

  getDocs = async (token, searchh) => {
    const tok = "?continuationToken=" + token;
    const get = token == null ? "/" + searchh : tok;
    const test = token == null && searchh == null ? "" : get;
    await axios.get(this.state.urldocs + test).then(res => {
      const datos = res.data;

      if (datos.paginToken == null) {
        this.setState({ idToken: [...this.state.idToken, "null"] });
      } else {
        if (this.state.idToken.indexOf(datos.paginToken) <= -1) {
          this.setState({
            idToken: [...this.state.idToken, datos.paginToken]
          });
        }
      }

      //if(this.state.idObjects.map(function(e){ return e.id;}).indexOf(newSelection) >-1){
      this.setState({
        docus: datos.results,
        paginToken: datos.paginToken
        //idToken: this.state.idToken.indexOf(datos.paginToken) >-1 ? null: [...this.state.idToken, datos.paginToken]
      });
    });
  };

  nextPage = (token, search) => {
    //console.log(token);

    if (token === null) {
      this.setState({
        idToken: [null, this.state.paginToken]
      });
    }
    this.getDocs(token, null);
  };

  verArray = (document: IObjectDelete) => {
    const newSelection = document.id;
    let newSelectionArray;
    if (
      this.state.idObjects
        .map(function (e) {
          return e.id;
        })
        .indexOf(newSelection) > -1
    ) {
      newSelectionArray = this.state.idObjects.filter(
        docs => docs.id !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.idObjects, document];
    }

    this.setState({
      idObjects: newSelectionArray
    });
  };
  deleteDocs = async () => {
    await axios.post(deleteobj, this.state.idObjects).then(res => {
      //console.log(res.data)
    });

    this.getDocs(null, null);
    this.setState({
      idObjects: []
    });
  };

  handleSearch(seachh, token) {
    //console.log(" dato "+seachh, token)
    this.getDocs(null, seachh);
  }

  async deleteAllfn() {
    await axios.delete(DeleteAll).then(function (res) {
      //console.log(res.data)
    });
    this.getDocs;
  }

  buscar(e: React.ChangeEvent<HTMLInputElement>) {
    const valor = e.target.value;
    if (valor === "") {
      this.getDocs(null, null);
    }
  }

  selectAll() {
    this.state.idObjects.length !== 0
      ? this.setState({
        idObjects: []
      })
      : this.setState({
        idObjects: this.state.docus
      });
  }

  ultimotoken() {
    const token = this.state.idToken[this.state.idToken.length - 3];
    this.getDocs(token, null);
    const data = this.state.idToken.pop();
    //console.log(data);
  }

  render() {
    return (
      <div className="container-fluid">
        <DocumentList
          docus={this.state.docus}
          paginToken={this.state.paginToken}
          selectOptions={this.state.idObjects}
          verArray={this.verArray}
          searchDoc={this.handleSearch.bind(this)}
          buscar={this.buscar.bind(this)}
          selectAll={this.selectAll.bind(this)}
        />

        <div className="nav  justify-content-center">
          <div
            className="btn-group btn-group-sm"
            role="group"
            aria-label="Basic example"
          >
            <DeleteDialog deleteDocs={this.deleteDocs} />
            &nbsp;&nbsp;
            <button
              onClick={() => {
                this.setState({ idToken: [null] }), this.getDocs(null, null);
              }}
              className="btn btn-outline-primary"
            >
              Fisrt <FirstPage />
            </button>
            {this.state.idToken.length >= 3 ? (
              <button
                onClick={() => this.ultimotoken()}
                className="btn btn-outline-primary"
              >
                Previous <SkipPrevious />
              </button>
            ) : null}
            {this.state.paginToken !== null ? (
              <button
                onClick={() => this.nextPage(this.state.paginToken, null)}
                className="btn btn-outline-primary"
              >
                Next <SkipNext />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

/// busqueda de archivo cosmos orden de fecha de archivo
// barra el logo nuevo
// estado documentos (status indexado) columna adicional
// estadi de indexacion
// login solo admin
// ver landing, el admin solo puede hacer upload y delete...
// ver la parte
// mandar skills a rafa
/*

import * as React from 'react';
import axios from 'axios';
import Popup from "reactjs-popup";
const Docs = 'https://cosmo-rest-api-get.azurewebsites.net/api/Documentos';
const UriDelete = "https://cosmo-rest-api-delete.azurewebsites.net/api/documentos/";
const DeleteAll = 'https://cosmo-rest-api-delete.azurewebsites.net/api/DeleteAllDocBlobs?code=mCIXOoiAAL7ai5NlYMAN5mrSdcR522yX7Ao5NIesKPKNhiNvWkBdMQ==';
const uriDownload = 'https://blobstoragedq.azurewebsites.net/api/DownloadBlob/';



export default class Documents extends React.Component {
    state = {
        docs: []
    }
    componentDidMount(){
        this.getDocs();
    }


    getDocs = async () =>{
        await axios.get(Docs)
        .then( res => {
            const docs = res.data;
            this.setState({
                docs
            })
        })
    }

    async deletefn (id, IdBoleta,NombreDocumento) {
    console.log("delete OK" + id);
    console.log(UriDelete +'?id='+ id +'&IdBoleta='+ IdBoleta +'&blobName='+ NombreDocumento)
    await axios.delete(UriDelete +'?id='+ id +'&IdBoleta='+ IdBoleta +'&blobName='+ NombreDocumento)
      .then(function (res) {
        console.log(res.data)
      })
    this.getDocs();
  }

    async deleteAllfn () {
    await axios.delete(DeleteAll)
      .then(function(res){
        console.log(res.data)
      })
      this.getDocs();
  }

    async downloadDocs(NombreDocumento){
      console.log(uriDownload + NombreDocumento);
      await axios.get(uriDownload + NombreDocumento)
        .then(res => {

               const data = res.data;

        });
  }


    render() {
        return (
            <div>
                <table className="table table-sm table-bordered table-responsive">
                    <thead>
                        <tr >
                            <th scope="col">NOMBRE DOCUMENTO</th>
                            <th scope="col"> <Popup trigger={<button className="btn btn-danger btn-sm"> Delete All </button>} modal>
                    {close => (
                      <div >
                        <div className="content">
                          {" "}
                          ¿Are you Sure?
                        <br />
                        </div>
                        <div className="actions">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => {
                              console.log("modal closed ");
                              close();
                              this.deleteAllfn();
                            }}
                          >
                            Ok!
                                </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              console.log("modal closed ");
                              close();
                            }}
                          >
                            Cancel
                                </button>
                        </div>
                      </div>
                    )}
                  </Popup> </th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                          this.state.docs.map(docs =>
                          (
                          <tr key={docs.id}>
                              <td>  {docs.nombreDocumento} </td>
                            <td>
                  <Popup trigger={<button className="btn btn-danger btn-sm"> Delete </button>} modal>
                    {close => (
                      <div >
                        <div className="content">
                          {" "}
                          ¿Are you Sure?
                        <br />
                        </div>
                        <div className="actions">
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => {
                              console.log("modal closed ");
                              close();
                              this.deletefn(docs.id, docs.idBoleta, docs.nombreDocumento);
                            }}
                          >
                            Ok!
                                </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              console.log("modal closed ");
                              close();
                            }}
                          >
                            Cancel
                                </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </td>
                     <td>
                    <a href={uriDownload + docs.nombreDocumento}>
                    <button
                            className="btn btn-success btn-sm"
                          >
                            Download File
                                </button>
                                </a>
                                 </td>

                          </tr>)
                          )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}



*/
