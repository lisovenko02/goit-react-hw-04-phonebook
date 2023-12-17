import { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  return savedContacts !== null ? JSON.parse(savedContacts) : [];
}

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts)
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]) 

  const addForm = newListForm => {
    const checkContact = contacts.some(
      item => item.name.toLowerCase() === newListForm.name.toLowerCase()
    );
    
    if(checkContact) {
      return alert(`${newListForm.name} is already in contacts`);
    }
    
    setContacts(prevItems => [
        ...prevItems,
        {
          id: nanoid(),
          ...newListForm
        }
      ])
  };
  
  const deleteForm = formId => {
    setContacts(prevItems => prevItems.filter(form => form.id !== formId))
  };

  const changeFilter = newTopic => setFilter(newTopic);
  
  const getVisibleCardItems = () => {
    return contacts.filter(contact => 
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
  };

  const items = getVisibleCardItems();
  return (
    <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 30,
            color: '#010101'
          }}
        >
        <div>
        <h1>Phonebook</h1>
        <ContactForm addForm={addForm}/>
  
        <h2>Contacts</h2>
        <Filter filter={filter} onChangeFilter={changeFilter}/>
        <ContactList items={items} onDelete={deleteForm}/>
        </div>
        </div>
  )

};





