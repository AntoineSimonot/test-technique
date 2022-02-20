import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';

export default function App() {
  const [today, setToday] = useState('');

  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [secondes, setSecondes] = useState('');

  useEffect(() => {

    // get current date
    const interval = setInterval(() => {
        const currentTime = moment()
        setToday(currentTime);
    }, 1000);


    // get next monday
    const nextMonday  = moment().add(1, 'weeks').isoWeekday(1);
    nextMonday.set({'hour': 17, 'minute': 0, 'seconds': 0});

    // get next friday 
    const nextThursday = moment().add(1, 'weeks').isoWeekday(4);
    nextThursday.set({'hour': 2, 'minute': 37, 'seconds': 0});

    // get next sunday
    const nextSunday = moment().add(1, 'weeks').isoWeekday(6);
    nextSunday.set({'hour': 14, 'minute': 54, 'seconds': 0});


    // wich is the next day
    const diffMonday = nextMonday.diff(today, 'seconds');
    const diffThursday = nextThursday.diff(today, 'seconds');
    const diffSunday = nextSunday.diff(today, 'seconds');
 
    let nextNearDay = '';

    if (diffMonday < diffSunday && diffMonday < diffThursday) {
      nextNearDay = nextMonday
    }
    else if (diffThursday < diffMonday && diffThursday < diffSunday) {
      nextNearDay = nextThursday
    }
    else {
      nextNearDay = nextSunday
    }

    // formating date
    const duration = moment.duration(nextNearDay.diff(today));
    const days = duration.asDays();
    const hours = (days - Math.floor(days)) * 24;
    const minutes = (hours - Math.floor(hours)) * 60;
    const secondes = (minutes - Math.floor(minutes)) * 60;

    setDays(Math.floor(days));
    setHours(Math.floor(hours));
    setMinutes(Math.floor(minutes));
    setSecondes(Math.floor(secondes));

    return () => clearInterval(interval);

  }, [today]);

  if (today === '') {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Il reste {days} jours, {hours} heures, {minutes}, et {secondes} secondes</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
