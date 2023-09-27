import React, { Component, Fragment } from 'react'
import { Container, Form, InputGroup } from 'react-bootstrap';

export class ContactHeader extends Component {
  render() {
    const {searchRef, searchContacts} = this.props
    return (
      <Fragment>
        <section>
          <Container>
          <InputGroup className="my-3">
            <Form.Control
              onChange={searchContacts}
              ref={searchRef}
              placeholder="Searching contact..."
            />
            <InputGroup.Text>
              <Form.Select >
              <option value="all">All</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="relatives">Relatives</option>
                <option value="favourite">Favourite</option>
                <option value="other">Other</option>
              </Form.Select>
            </InputGroup.Text>
          </InputGroup>
          </Container>
        </section>
      </Fragment>
    )
  }
}

export default ContactHeader;