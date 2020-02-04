import *as React from 'react';
import { CloudUpload } from 'material-ui-icons';

interface Iprops {
    fileUpload: () => void;
}

export default class UploadDialog extends React.Component<Iprops,any>{
    render(){
        return(
            <div>
                <button type="button" className="btn btn-primary bt-sm" data-toggle="modal" data-target="#exampleModal">
                    Upload <CloudUpload />
                </button>
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Upload Recomendation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                    wait until all the documents are uploaded...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success btn-sm" data-dismiss="modal" onClick={this.props.fileUpload}>Ok </button>                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}