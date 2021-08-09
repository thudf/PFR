import React from 'react';

import {Scroll} from './styles';

import ContactsListItem from './components/ContactsListItem';

const ContactsList = ({
  chatList,
  selectedList = [],
  handleClick = contact => console.log(contact),
}) => {
  return (
    <Scroll
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      {chatList &&
        chatList.map((item, index) => (
          <ContactsListItem
            key={`${item.name}-${index}`}
            item={item}
            isFirst={index === 0}
            isLast={index === chatList.length - 1}
            selected={selectedList.includes(item)}
            handleClick={contact => handleClick(contact)}
          />
        ))}
    </Scroll>
  );
};

export default ContactsList;
