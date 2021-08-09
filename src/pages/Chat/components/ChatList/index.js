import React from 'react';

import {Scroll} from './styles';

import ChatListItem from '../ChatListItem';

const ChatList = ({chatList, handleDelete, isGroup}) => {
  return (
    <Scroll
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
      {chatList &&
        chatList.map((item, index) => (
          <ChatListItem
            key={`${item.title}-${index}`}
            item={item}
            isFirst={index === 0}
            isLast={index === chatList.length - 1}
            handleDelete={chat => handleDelete(chat)}
            isGroup={isGroup}
          />
        ))}
    </Scroll>
  );
};

export default ChatList;
