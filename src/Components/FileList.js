import FileLink from "./FileLink";
import {Component} from "react";
import {Storage} from "aws-amplify";

class  FileList extends Component {

    state = {publicFiles: [], protectedFiles: [], privateFiles: []};

    filesListFetch = async () => {
        const publicFiles = await Storage.list('', {level: 'public'});
        const protectedFiles = await Storage.list('', {level: 'protected'});
        const privateFiles = await Storage.list('', {level: 'private'});
        this.setState({publicFiles, protectedFiles, privateFiles});
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        this.filesListFetch();
    }

    componentDidMount() {
        this.filesListFetch();
    }

    render() {
        return (
        <>
            <h3>Public files</h3>
            <ul>
                {this.state.publicFiles.map((item) => <FileLink key={item.key} file={item} level='public' />)}
            </ul>
            <h3>Protected files</h3>
            <ul>
                {this.state.protectedFiles.map((item) => <FileLink key={item.key} file={item} level='protected'/>)}
            </ul>
            <h3>Private files</h3>
            <ul>
                {this.state.privateFiles.map((item) => <FileLink key={item.key} file={item} level='private'/>)}
            </ul>
            <a onClick={this.filesListFetch}> Refresh list of files</a>
        </>
        )
    };
}

export default FileList;
