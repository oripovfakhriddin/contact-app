import React, { Component, Fragment } from 'react'
import { Alert, Button, Container } from 'react-bootstrap';

export class ContactCard extends Component {
  render() {

    
    const { id, firstName, lastName, phoneNumber,  favourite, edit, deleteContact} = this.props

    return (
      <Fragment>
        <section>
          <Container>
            <Alert className="d-flex justify-content-between align-items-center">
              <div>
                <h6> {firstName} {lastName}</h6>
                <p>{phoneNumber}</p>
              </div>
              <div>
                {favourite ? 
                <Button className="me-3" variant="danger">
                  Un Favourute
                </Button> : 
                <Button className="me-3" variant="success">
                  Favourute
                </Button>}
                <Button onClick={()=>{edit(id)}} className="me-3" variant="primary">
                  Edit
                </Button>
                <Button onClick={()=>{deleteContact(id)}} variant="danger">
                    Delete
                </Button>
              </div>
            </Alert>
          </Container>
        </section>
      </Fragment>
    )
  }
}

export default ContactCard;