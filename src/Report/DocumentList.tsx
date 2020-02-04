import * as React from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { IDocu } from "./Docu";
import { IObjectDelete } from "./ObjDelete";
import { FileDownload, Search, Delete, SelectAll } from "material-ui-icons";
import { TextField } from "material-ui";

const uriDownload = "https://blobstoragedq.azurewebsites.net/api/DownloadBlob/";

interface IDocumentListProps {
  docus: IDocu[];
  paginToken: string;
  searchDoc: (searchh: string, token: string) => void;
  selectOptions: object[];
  verArray: (document: IObjectDelete) => void;
  buscar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectAll: () => void;
}

interface IDocumentListState {
  id: string;
  idBoleta: string;
  nombreDocumento: string;
  searchName: string;
}

export default class DocumentList extends React.Component<
  IDocumentListProps,
  IDocumentListState
> {
  constructor(props: IDocumentListProps) {
    super(props);
    this.state = {
      id: "",
      idBoleta: "",
      nombreDocumento: "",
      searchName: ""
    };
  }

  handleInputChange = (id, idBoleta, nombreDocumento) => {
    const newDocument: IObjectDelete = {
      id: id,
      IdBoleta: idBoleta,
      NombreDocumento: nombreDocumento
    };

    this.props.verArray(newDocument);
  };

  handleSearch = async nombreDocumento => {
    await axios.get(uriDownload + nombreDocumento).then(res => {
      const data = res.data;
    });
  };

  render() {
    return (
      <div>
        <div className="container p-2">
                  <TextField
                    label="Search Document"
                    style={{ color: "blue" }}
                    onChange={e => {
                      this.props.buscar(e);
                      this.setState({ searchName: e.target.value });
                    }}
                  ></TextField>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      this.props.searchDoc(this.state.searchName, null)
                    }
                  >
                    Search <Search />{" "}
                  </button>
       
        </div>
        <table className="table table-sm table-borderless table-responsive">
          <thead>
            <tr className="table-primary">
              <th>
                <button className="btn  btn-sm" onClick={this.props.selectAll}>
                  <SelectAll color="primary" />
                </button>
              </th>
              <th scope="col">Nombre Documento</th>
              <th scope="col">Fecha de Inserción</th>
              <th scope="col">Hora de Inserción</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.docus.map(docu => (
              <tr key={docu.id}>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    checked={
                      this.props.selectOptions
                        .map(function(e: IObjectDelete) {
                          return e.id;
                        })
                        .indexOf(docu.id) > -1
                    }
                    onChange={() =>
                      this.handleInputChange(
                        docu.id,
                        docu.IdBoleta,
                        docu.NombreDocumento
                      )
                    }
                  />
                </td>
                <td>{docu.NombreDocumento}</td>
                <td>
                  {new Date(docu.FechaInsercion).toLocaleDateString("es-ES")}
                </td>
                <td>{new Date(docu.FechaInsercion).toLocaleTimeString()}</td>
                <td>
                  <a href={uriDownload + docu.NombreDocumento}>
                    <button className="btn btn-outline-success btn-sm">
                      Download <FileDownload />
                    </button>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

//LOGOS PEQUEÑOS
//https://medium.com/fullstacked/connect-react-to-ethereum-b117986d56c1
//previos page
//favicon
//select all borrar
//revisar skill ocr
//process in document
//revisar skills

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
