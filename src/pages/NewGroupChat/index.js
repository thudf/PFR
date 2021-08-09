import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import ContactsList from '../../components/ContactsList';
import LoadingModal from '../../components/LoadingModal';
import SearchInput from '../../components/SearchInput';
import AuxIcon from '../../components/AuxIcon';

import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  ChatTabsContainer,
  ChatTab,
  ChatTabButton,
  ChatTabTitle,
  FloatButton,
} from './styles';

const NewGroupChat = () => {
  const navigation = useNavigation();
  const {user} = useAuth();

  const [activeTab, setActiveTab] = useState('Médicos');
  const [loading, setLoading] = useState(false);
  const [patientsInitialList, setPatientsInitialList] = useState([]);
  const [patientsContactsList, setPatientsContactsList] = useState([]);
  const [doctorsInitialList, setDoctorsInitialList] = useState([]);
  const [doctorsContactsList, setDoctorsContactsList] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [selectedPatients, setSelectedPatients] = useState([]);

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
      console.log(text);
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

  const handleDoctorContactClick = useCallback(
    item => {
      const includes = selectedDoctors.includes(item);

      if (!includes) {
        setSelectedDoctors(oldStt => [...oldStt, item]);
      }

      if (includes) {
        const contactIndex = selectedDoctors.findIndex(
          contact => contact.id === item.id,
        );

        const newSelectedDoctors = [...selectedDoctors];
        newSelectedDoctors.splice(contactIndex, 1);

        setSelectedDoctors(newSelectedDoctors);
      }
    },
    [selectedDoctors],
  );

  const handlePatientContactClick = useCallback(
    item => {
      const includes = selectedPatients.includes(item);

      if (!includes) {
        setSelectedPatients(oldStt => [...oldStt, item]);
      }

      if (includes) {
        const contactIndex = selectedPatients.findIndex(
          contact => contact.id === item.id,
        );

        const newSelectedPatients = [...selectedPatients];
        newSelectedPatients.splice(contactIndex, 1);

        setSelectedPatients(newSelectedPatients);
      }
    },
    [selectedPatients],
  );

  useEffect(() => {
    handleFilter(searchValueRef.current.value);
  }, [activeTab, handleFilter]);

  useEffect(() => {
    console.log('selectedPatients: ', selectedPatients);
  }, [selectedPatients]);

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
          selectedList={selectedDoctors}
          handleClick={item => handleDoctorContactClick(item)}
        />
      )}
      {activeTab === 'Pacientes' && (
        <ContactsList
          chatList={patientsContactsList}
          selectedList={selectedPatients}
          handleClick={item => handlePatientContactClick(item)}
        />
      )}
      <FloatButton
        onPress={() =>
          navigation.navigate('NewGroupDetails', {
            contacts: [...selectedPatients, ...selectedDoctors],
          })
        }>
        <AuxIcon type={'white'} icon={'arrowRight'} width={35} height={35} />
      </FloatButton>
      <LoadingModal visible={loading} />
    </Container>
  );
};

export default NewGroupChat;
