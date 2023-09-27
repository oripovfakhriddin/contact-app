import React, { Component, Fragment } from 'react'
import { Button, Container, Form } from 'react-bootstrap';

export class ContactForm extends Component {
  
  render() {

    const { contact, submit, validated, handleContact, selected } = this.props;
    
    return (
      <Fragment>
        <section>
          <Container>
          <Form validated={validated} noValidate onSubmit={submit} className='w-50 m-auto'>
            <Form.Group md="4" controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                onChange={handleContact}
                required
                type="text"
                placeholder="First name"
                value={contact.firstName}
              />
              <Form.Control.Feedback>
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please fill !
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="4" controlId="lastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                onChange={handleContact}
                required
                type="text"
                placeholder="Last name"
                value={contact.lastName}
              />
              <Form.Control.Feedback>
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please fill !
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="4" controlId="phoneNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                onChange={handleContact}
                required
                type="text"
                placeholder="Number"
                value={contact.phoneNumber}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="categories">
              <Form.Label>Categories</Form.Label>
              <Form.Select  onChange={handleContact} value={contact.categories}>
                <option value="other">Other</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="relatives">Relatives</option>
                <option value="favourites">Favourites</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="w-100">
              {selected === null ? "Add" : "Save"} todo
            </Button>
          </Form>
          </Container>
        </section>
      </Fragment>
    )
  }
}

export default ContactForm;