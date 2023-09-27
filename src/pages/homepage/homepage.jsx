import React, { Component, Fragment, createRef } from 'react'
import ContactForm from '../../components/contactform/contactform';
import ContactHeader from '../../components/contactheader/contactheader';
import ContactCard from '../../components/contactcard/contactcard';
import Footer from '../../components/footer/footer';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { v4 } from 'uuid';

export class HomePage extends Component {

  constructor(props) {
    super(props)
    this.searchRef = createRef();
    this.firstNameRef = createRef();
    this.state = {
      tabsControl: "all",
      contacts: JSON.parse(localStorage.getItem("contacts")) || [
        {
          id: 1,
          firstName: "Fakhriddin",
          lastName: "Oripov",
          phoneNumber: "+998906949416",
          categories: "family",
          favourite: false,
        },
        {
          id: 2,
          firstName: "Samandar",
          lastName: "Keldibekov",
          phoneNumber: "+998970367170",
          categories: "friends",
          favourite: true,
        },
        {
          id: 3,
          firstName: "Sherzod",
          lastName: "Mamatov",
          phoneNumber: "+998940256120",
          categories: "friends",
          favourite: true,
        },
        {
          id: 4,
          firstName: "Jahongir",
          lastName: "Erkinov",
          phoneNumber: "+998906949415",
          categories: "relatives",
          favourite: true,
        },
        {
          id: 5,
          firstName: "dkskfd",
          lastName: "dfdswd",
          phoneNumber: "+998906949415",
          categories: "other",
          favourite: false,
        },
        {
          id: 6,
          firstName: "ooooo",
          lastName: "ppp",
          phoneNumber: "+998906949415",
          categories: "relatives",
          favourite: false,
        },
      ],
      contact: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        categories: "other",
        favourite: false,
      },
      searchValue: "",
      validated: false,
      selected: null
    }
  }


  render() {

    const { tabsControl, contacts, searchValue, contact, validated, selected } = this.state;

    const controlledTabs = (key) =>{
      this.setState({tabsControl: key})
    }

    const handleContact = (e) =>{
      this.setState({contact: { ...contact, [e.target.id] : e.target.value }})
    }

    const addContacts = (e) => {
      e.preventDefault();
      if(e.target.checkValidity()){
        let newContacts
        let newContact = { ...contact, id: v4()};
        if (selected === null) {
          newContacts = [ ...contacts,  newContact ]
        }else{
          newContacts = contacts.map((contact)=>{
            if(contact.id === selected){
              return newContact
            }
            return contact
          })
        }
        
        localStorage.setItem("contacts", JSON.stringify(newContacts));
        this.firstNameRef.current.focus();
        this.setState({
          contacts: newContacts,
          contact: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            categories: "other",
            favourite: false,
          },
          validated: false
        })
      }
      else{
        this.setState({
          validated: true
        })
      }
    }

    const editContacts = (id) =>{
      const contact = contacts.find((contact)=>contact.id === id )
      this.setState({contact, selected: id})
    }

    const deleteContacts = (id) =>{
      let newContacts = contacts.filter((contact)=>(contact.id !== id))
      this.setState({contacts : newContacts});
      localStorage.setItem("contacts", JSON.stringify(newContacts))
    }

    const searchContacts = () => {
      this.setState({
        searchValue: this.searchRef.current.value.trim().toLowerCase(),
      })
    }


    

    let allContacts = contacts.filter((contact)=> contact.firstName.toLowerCase().includes(searchValue) )

    const familyContacts = allContacts.filter((contact)=>
      contact.categories === "family"
    )
    const relativesContacts = allContacts.filter((contact)=> 
    contact.categories === "relatives"
    )
    const friendsContacts = allContacts.filter((contact)=>
      contact.categories === "friends"
    )
    const favouriteContacts = allContacts.filter((contact)=>
      contact.favourite
    )
    const otherContacts = allContacts.filter((contact)=>
      contact.categories === "other"  
    )

    
    

    return (
      <Fragment>
        <ContactForm submit={ addContacts } validated= {validated}  contact = {contact} handleContact = { handleContact } selected = {selected}/>
        <ContactHeader searchRef = {this.searchRef} searchContacts = {searchContacts} />
        <Container>
          <Tabs activeKey={tabsControl}
          variant='pills'  className="mb-3" fill onSelect={controlledTabs} >
            <Tab eventKey="all" title="All">
              {allContacts.map((contact, i)=>(
                <ContactCard key={i} {...contact} edit = {editContacts} deleteContact = {deleteContacts} />
              ))}
            </Tab>
            <Tab eventKey="family" title="Family">
              {familyContacts.map((contact, i)=>(
                <ContactCard key={ i } {...contact} edit = {editContacts} deleteContact = {deleteContacts} />
              ))}
            </Tab>
            <Tab eventKey="friends" title="Friends">
              {friendsContacts.map((contact, i)=>(
                <ContactCard key={ i } { ...contact } edit = {editContacts} deleteContact = {deleteContacts} /> 
              ))}
            </Tab>
            <Tab eventKey="relatives" title="Relatives">
              {relativesContacts.map((contact, i)=>(
                <ContactCard key={ i } { ...contact } edit = {editContacts} deleteContact = {deleteContacts} /> 
              ))}
            </Tab>
            <Tab eventKey="favourite" title="Favourite">
              {favouriteContacts.map((contact, i)=>(
                <ContactCard key={ i } { ...contact } edit = {editContacts} deleteContact = {deleteContacts} />
              ))}
            </Tab>
            <Tab eventKey="other" title="Other">
              {otherContacts.map((contact, i)=>(
                <ContactCard key={ i } { ...contact } edit = {editContacts} deleteContact = {deleteContacts} />
              ))}
            </Tab>
          </Tabs>
        </Container>
        

        <Footer /> 
      </Fragment>
    )
  }
}

export default HomePage;