import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import ContactsList from '../../components/ContactsList';
import LoadingModal from '../../components/LoadingModal';
import SearchInput from '../../components/SearchInput';

import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  ChatTabsContainer,
  ChatTab,
  ChatTabButton,
  ChatTabTitle,
} from './styles';

const NewPrivateChat = () => {
  const navigation = useNavigation();
  const {user} = useAuth();

  const [activeTab, setActiveTab] = useState('Médicos');
  const [loading, setLoading] = useState(false);
  const [patientsInitialList, setPatientsInitialList] = useState([]);
  const [patientsContactsList, setPatientsContactsList] = useState([]);
  const [doctorsInitialList, setDoctorsInitialList] = useState([]);
  const [doctorsContactsList, setDoctorsContactsList] = useState([]);

  const searchValueRef = useRef({value: ''});

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const {data: patientsList} = await api.get('users-type?type=client');
      const {data: doctorsList} = await api.get('users-type?type=medic');

      const filteredPatientsList = patientsList.filter(
        patient => patient.id !== user.id,
      );

      const filteredDoctorsList = doctorsList.filter(
        doctor => doctor.id !== user.id,
      );

      setPatientsInitialList(filteredPatientsList);
      setPatientsContactsList(filteredPatientsList);
      setDoctorsInitialList(filteredDoctorsList);
      setDoctorsContactsList(filteredDoctorsList);
      setLoading(false);
    } catch (error) {
      console.log('contacts_list_error', error.response);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleFilter = useCallback(
    text => {
      const contactName = text.toLowerCase();
      const contactNameLength = contactName.split('').length;

      if (contactNameLength) {
        if (activeTab === 'Médicos' && doctorsInitialList.length > 0) {
          const filteredList = doctorsInitialList.filter(contact => {
            const contactLowerArray = contact.name.toLowerCase().split('');
            const contactLowerArrayLength = contactLowerArray.length;

            if (contactLowerArrayLength >= contactNameLength) {
              const teste = contactLowerArray
                .slice(0, contactNameLength)
                .join('');

              if (teste === contactName) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          });

          console.log(filteredList);
          setDoctorsContactsList(filteredList);
        }

        if (activeTab === 'Pacientes' && patientsInitialList.length > 0) {
          const filteredList = patientsInitialList.filter(contact => {
            const contactLowerArray = contact.name.toLowerCase().split('');
            const contactLowerArrayLength = contactLowerArray.length;

            if (contactLowerArrayLength >= contactNameLength) {
              const teste = contactLowerArray
                .slice(0, contactNameLength)
                .join('');

              if (teste === contactName) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          });

          console.log(filteredList);
          setPatientsContactsList(filteredList);
        }
      }

      if (!contactNameLength) {
        if (activeTab === 'Médicos') {
          setDoctorsContactsList(doctorsInitialList);
        }

        if (activeTab === 'Pacientes') {
          setPatientsContactsList(patientsInitialList);
        }
      }
    },
    [activeTab, doctorsInitialList, patientsInitialList],
  );

  useEffect(() => {
    handleFilter(searchValueRef.current.value);
  }, [activeTab, handleFilter]);

  const handleContactClick = useCallback(
    async contact => {
      try {
        setLoading(true);
        const response = await api.get(`/room-user/${contact.id}`);

        if (response.data) {
          setLoading(false);
          navigation.navigate('ChatRoom', {
            id: response.data.id,
            title: response.data.title,
            is_group: false,
            avatar: contact.avatar,
          });
        }

        if (!response.data) {
          const {data} = await api.post('rooms', {
            title: contact.name,
            users: [user.id, contact.id],
          });

          console.log(data);

          setLoading(false);
          navigation.navigate('ChatRoom', {
            id: data.id,
            title: data.title,
            is_group: false,
            avatar: contact.avatar,
          });
        }
      } catch (error) {
        setLoading(false);
        console.log(error.response);
      }
    },
    [user.id, navigation],
  );

  return (
    <Container>
      <SearchInput
        placeholder={'Pesquisar CPF ou Nome'}
        handleFilter={e => {
          searchValueRef.current.value = e;
          handleFilter(e);
        }}
      />
      <ChatTabsContainer>
        {['Médicos', 'Pacientes'].map(tab => (
          <ChatTab key={tab} active={activeTab === tab}>
            <ChatTabButton onPress={() => setActiveTab(tab)}>
              <ChatTabTitle active={activeTab === tab}>{tab}</ChatTabTitle>
            </ChatTabButton>
          </ChatTab>
        ))}
      </ChatTabsContainer>
      {activeTab === 'Médicos' && (
        <ContactsList
          chatList={doctorsContactsList}
          handleClick={contact => handleContactClick(contact)}
        />
      )}
      {activeTab === 'Pacientes' && (
        <ContactsList
          chatList={patientsContactsList}
          handleClick={contact => handleContactClick(contact)}
        />
      )}
      <LoadingModal visible={loading} />
    </Container>
  );
};

export default NewPrivateChat;
