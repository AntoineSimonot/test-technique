import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import Time from './Components/Time';
import Logo from './Components/Logo';

export default function App() {
  const [today, setToday] = useState<Moment>();

  const [days, setDays] = useState<number>();
  const [hours, setHours] = useState<number>();
  const [minutes, setMinutes] = useState<number>();
  const [secondes, setSecondes] = useState<number>();
  const [dayName, setDayName] = useState<string>();
  const [dayProgression, setDayProgression] = useState<string>();
  const [dayProgressSub, setDayProgressSub] = useState<string>();

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
    
    // function to absolute value
    const absDay = (value: number) => Math.abs(value);

    let nextNearDay = moment();
    let diff = Number.MAX_SAFE_INTEGER;

    if (absDay(diffMonday) < absDay(diffThursday) && absDay(diffMonday) < absDay(diffThursday) && diffMonday > 0) {
      nextNearDay = nextMonday
      setDayName('Lundi')
      diff = nextSunday.diff(nextMonday, 'seconds');
    }
    else if (absDay(diffThursday) < absDay(diffSunday) && diffThursday > 0) {
      nextNearDay = nextThursday
      diff = nextThursday.diff(nextMonday, 'seconds');
      setDayName('Jeudi')
    }
    else if(diffSunday > 0) {
      diff = nextSunday.diff(nextThursday, 'seconds');
      nextNearDay = nextSunday
      setDayName('Samedi')
    }
    else {
      diff = nextThursday.diff(nextMonday, 'seconds');

      nextMonday.add(7, 'days');
      nextNearDay = nextMonday
      setDayName('Lundi')
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


    console.log(diff, duration)
    let dayProgression = (Math.abs(((100 - ((duration.asSeconds()) / diff) * 100)))).toString() + '%'
  
    setDayProgression(dayProgression)

   setDayProgressSub(dayProgression.substring(0, 4) + '%')
    return () => clearInterval(interval);

   
  }, [today]);


  return (
    <ImageBackground source={require('./assets/background.png')} resizeMode="cover" style={styles.body} >
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Image source={require('./assets/alarm.png')} style={styles.logo} />
          <Text style={[styles.text, styles.companyName] }>TicTac!</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={[styles.text, styles.title]}>Mon compteur pratique</Text>
          <Text style={styles.text}>Combien de temps avant le prochain : <Text style={styles.dayName}>{dayName}</Text></Text>
        </View>

        <View style={styles.timeContainer}>
          <Time uniteValue={days} uniteName="jours" border={true}></Time>
          <Time uniteValue={hours} uniteName="heures" border={true}></Time>
          <Time uniteValue={minutes} uniteName="minutes" border={true}></Time>
          <Time uniteValue={secondes} uniteName="secondes" border={false}></Time>
        </View>


        <View style={styles.progressBarContainer}>
          <View style={progressBarStyle(dayProgression)}></View>
          <Text style={[styles.text, styles.progressionValue]}>{dayProgressSub}</Text>
        </View>

      </View>

    
      <View style={styles.footer}>
        <View style={styles.icones}>
        <Logo link='https://www.linkedin.com/in/simonotantoine/' logoImg='linkedin'></Logo>
          <Logo link='https://github.com/AntoineSimonot/test-technique' logoImg='github'></Logo>
          <Logo link='https://fr.fiverr.com/gryphenrn?up_rollout=true' logoImg='fiverr'></Logo>
        </View>
  
        <Text style={[styles.text, styles.footerText]}>Made with ❤️ by <Text style={styles.footerLink} onPress={()=> {
          Linking.openURL('https://github.com/AntoineSimonot/test-technique')
        }}>@antoine-simonot</Text></Text>
      </View>
     

      <StatusBar style="auto" />
    </ImageBackground >
  );
}

const progressBarStyle = (percent: string) => {
  return {
    height: '100%',
    width: percent,
    backgroundColor: '#4c515899',
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  bodyContainer: {
    width: '80%',
    height: '80%',
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text: {
    color: '#EEEEEE',
    textAlign: 'center',
    fontSize: 16,
  },
  companyName:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  title: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  dayName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10d4df',
  },
  earth: {
    width: 275,
    height: 275,
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ translateX: 60 }, { translateY: 60 }],
    overflow: 'hidden',
    
  },
  contentContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  progressBarContainer: {
    width: '100%',
    height: 40,
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#00ADB5',
    borderRadius: 5,
  },
  progressionValue: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    transform: [{ translateY: 6 }],
    fontSize:
     21,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLink: {
    color: '#10d4df',
    fontWeight: 'bold',    
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#10d4df',
    fontStyle: 'italic',
  },
  footerText: {
    fontSize: 16,
    color: '#EEEEEE',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },
  icones:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
