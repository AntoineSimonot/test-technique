import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';

export default function App() {
  const [today, setToday] = useState<Moment>();

  const [days, setDays] = useState<Number>();
  const [hours, setHours] = useState<Number>();
  const [minutes, setMinutes] = useState<Number>();
  const [secondes, setSecondes] = useState<Number>();

  useEffect(() => {

    // get current date
    const interval = setInterval(() => {
        const currentTime = moment();
        setToday(currentTime);
    }, 1000);


    // get next monday if is monday isn't already passed
    const nextMonday = moment().day(1)
    nextMonday.set({'hour': 17, 'minute': 0, 'seconds': 0 });

    // get next friday 
    const nextThursday = moment().day(4)
    nextThursday.set({'hour': 2, 'minute': 37, 'seconds': 0});


    // get next sunday
    const nextSunday = moment().day(6)
    nextSunday.set({'hour': 14, 'minute': 54, 'seconds': 0});


    // which is the next day
    const diffMonday = nextMonday.diff(today, 'seconds');
    const diffThursday = nextThursday.diff(today, 'seconds');
    const diffSunday = nextSunday.diff(today, 'seconds');
    
    // absolute value
    const diffMondayAbs = Math.abs(nextMonday.diff(today, 'seconds'));
    const diffThursdayAbs = Math.abs(nextThursday.diff(today, 'seconds'));
    const diffSundayAbs = Math.abs(nextSunday.diff(today, 'seconds'));

    let nextNearDay = moment();

    if (diffMondayAbs < diffSundayAbs && diffMondayAbs < diffThursdayAbs && diffMonday > 0) {
      nextNearDay = nextMonday
    }
    else if (diffThursdayAbs < diffSundayAbs && diffThursday > 0) {
      nextNearDay = nextThursday
    }
    else if(diffSunday > 0) {
      nextNearDay = nextSunday
    }
    else {
      nextMonday.add(7, 'days');
      nextNearDay = nextMonday
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


  return (
    <View style={styles.container}>
      <Text>Il reste {days} jours, {hours} heures, {minutes} minutes et {secondes} secondes</Text>
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
