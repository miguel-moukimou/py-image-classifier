import React, { Component } from 'react';
import axios from 'axios';
import Image from './Image';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/Spinner';

class  ImageList extends Component {
    state = { 
        images: [],
        visible: 2,
        isLoading: true,
        newLoaded: false
     }
    
    componentDidMount(){
        setTimeout(this.getImages, 1500);
    }

    getImages = () =>{
        axios.get('https://py-image-classifier.herokuapp.com/api/images/',{
            headers: {
                'accept': 'appliction/json'
            }
        }).then(resp =>{
            this.setState({images: resp.data})
            console.log(resp)
        })
        this.setState({isLoading: false});
    }

    handleVisible = () =>{
        const visible = this.state.visible;
        const new_visible = visible + 2;
        this.setState({newLoaded: true});
        setTimeout(() =>{
            this.setState({visible: new_visible})
            this.setState({newLoaded: false})
        }, 300)
        
    }

    render() {
        const images = this.state.images.slice(0, this.state.visible).map(img =>{
            return <Image key={img.id} pic = {img.picture} name={img.classified}/>
        }) 
        return (
            <div>
                {this.state.isLoading ?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                :
                    <React.Fragment>
                        {this.state.images.length === 0 &&
                            <h3>No images classifid</h3>
                        }
                        {images}
                        {this.state.newLoaded &&
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        }
                        {(!this.state.newLoaded && this.state.images.length > this.state.visible) && (this.state.images.length > 2) &&
                            <Button className='mb-3' onClick={this.handleVisible} variant='primary' size='lg'>Load more</Button> 
                        }
                        {((this.state.images.length <= this.state.visible) && (this.state.images.length > 0)) &&
                            <h3 className='mb-3'>No more images to load</h3>
                        }
                    </React.Fragment>
                }
            </div>
        );
    }
}
 
export default ImageList;