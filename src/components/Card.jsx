import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const CardBook = (props) =>{
    const navigate = useNavigate();
    return (
        <Card className='mt-5' style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.coverPic
} />
      <Card.Body>
        <Card.Title>{props.bookName}</Card.Title>
        <Card.Text>
            Book name is :  {props.bookName} <br/>Author is : {props.author} <br/>Price is : {props.price}
        </Card.Text>
        <Button onClick={()=> navigate(props.link)} variant="primary">View Details</Button>
      </Card.Body>
    </Card>
    );
}

export default CardBook;