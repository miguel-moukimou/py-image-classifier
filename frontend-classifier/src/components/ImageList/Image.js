import React from 'react';
import Card from 'react-bootstrap/Card';

const Image = (props) => {
    return (
        <Card style={{ width: '30rem' }} className='mx-auto mb-2'>
        <Card.Img variant="top" src={props.pic} />
        <Card.Body>
            <Card.Title>Classified as: {props.name}</Card.Title>
        </Card.Body>
        </Card>
    );
}
 
export default Image;