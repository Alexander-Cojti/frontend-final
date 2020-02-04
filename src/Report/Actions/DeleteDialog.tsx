import *as React from 'react';
import { Delete} from 'material-ui-icons';


interface Iprops {
    deleteDocs: () => void;
}

export default class DeleteDialog extends React.Component<Iprops,any>{
    render(){
        return(
            <div>
                <button type="button" className="btn btn-outline-danger bt-sm" data-toggle="modal" data-target="#exampleModal">
                    Delete <Delete />
                </button>
                <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Delete Documents</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you Sure?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger btn-sm" data-dismiss="modal" onClick={this.props.deleteDocs}>Delete <Delete /> </button>
                                <button type="button" className="btn btn-primary btn-sm" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}