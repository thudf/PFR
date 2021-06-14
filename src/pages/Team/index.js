/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';
import TeamButton from '../../components/TeamButton';

import api from '../../services/api';

import {Container, Scroll, Content} from './styles';

const Team = () => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState([]);

  const getTeam = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('team');
      console.log(response.data);

      const {data} = response;

      setTeam(data);

      setLoading(false);
    } catch (error) {
      setShowAlert(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <Content>
          {team &&
            team.map((member, index) => (
              <TeamButton
                key={`${member.avatar}-${member.name}-${index}`}
                avatar={member.avatar}
                name={member.name}
                specialty={member.specialty}
                isLast={team.length - 1 === index}
                onPress={() =>
                  navigation.navigate('TeamInfo', {teamMember: team[index]})
                }
              />
            ))}
        </Content>
      </Scroll>
      <LoadingModal visible={loading} />
      <CustomAlert
        visible={showAlert}
        title={'Ocorreu um erro'}
        message={
          'Não foi possível encontrar a equipe. Deseja tentar novamente?'
        }
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
          getTeam();
        }}
        cancelButtonText={'Não'}
        onCancel={() => {
          setShowAlert(false);
          navigation.navigate('Home');
        }}
      />
    </Container>
  );
};

export default Team;
