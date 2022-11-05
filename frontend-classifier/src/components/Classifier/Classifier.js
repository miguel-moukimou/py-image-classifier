import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import axios from 'axios';
import './Classifier.css';

class Classifier extends Component {
    state = {
        files: [],
        isLoading: false,
        recentImage: null
    }

    onDrop = (files) => {
        this.setState({ 
            isLoading: true,
            files: [],
            recentImage: null
        })
        this.loadImage(files);
    }

    loadImage = (files)=>{
        setTimeout(()=>{
            this.setState({
                files,
                isLoading: false
            }, () =>{
                console.log(this.state.files)
            })
        }, 1000)
        
    }

    activateSpinner = () =>{
        this.setState({
            files:[],
            isLoading: true,
        });
    }

    deactivateSpinner = () =>{
        this.setState({isLoading: false});
    }

    sendImage = ()=>{
        this.activateSpinner();
        let formData = new FormData();
        formData.append("picture", this.state.files[0], this.state.files[0].name)
        axios.post('https://py-image-classifier.herokuapp.com/api/images/', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response =>{
            this.getImageClass(response);
            console.log(response.data.id);
        })
        .catch(error =>{
            console.log(error);
        })

    }

    getImageClass = (obj) =>{
        axios.get(`https://py-image-classifier.herokuapp.com/api/images/${obj.data.id}/`, {
            headers: {
                'accept': 'application/json'
            }
        })
        .then(resp =>{
            this.setState({recentImage:resp})
            console.log(resp);
        })
        .catch(error=>{
            console.log(error)
        })
        this.deactivateSpinner();
    }

    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));
        return (
            <Dropzone onDrop={this.onDrop}>
                {({ isDragActive, getRootProps, getInputProps }) => (
                    <section className="container">
                        <div {...getRootProps({ className: 'dropzone back' })}>
                            <input {...getInputProps()} />
                            <i className="fa-solid fa-images mb-2 text-muted" style={{fontSize:100}}></i>
                            <p className='text-muted'>{isDragActive ? "Drop some images" : "Drag 'n' drop some files here, or click to select files"}</p>
                        </div>
                        <aside>
                            {files}
                        </aside>
                        {this.state.files.length > 0 &&
                        <Button variant='info' size='lg' className='mt-3' onClick={this.sendImage}>Select Image</Button>
                        }

                        {this.state.isLoading &&
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        }

                        {this.state.recentImage && 
                        <React.Fragment>
                            <Alert variant='primary'>
                                {this.state.recentImage.data.classified}
                            </Alert>
                            <img alt={this.state.recentImage.data.classified} className='justify-content-center' src={this.state.recentImage.data.picture} height='200' rounded/>
                        </React.Fragment>
                        }
                    </section>
                )}
            </Dropzone>
        );
    }
}

export default Classifier;
