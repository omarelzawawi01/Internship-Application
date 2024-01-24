import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Button,
} from "react-native";
import CustomDateTimePicker from "./../components/CustomDateTimePicker"; // Import your custom component

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setDateShowPicker] = useState(false);
  const [showTimePicker, setTimeShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  function converTime(time) {
    var hh = time.getHours().toString();
    var mm = time.getMinutes().toString();
    var ss = time.getSeconds().toString();
    var hhChars = hh.split("");
    var mmChars = mm.split("");
    var ssChars = ss.split("");
    return (
      (hhChars[1] ? hh : "0" + hhChars[0]) +
      ":" +
      (mmChars[1] ? mm : "0" + mmChars[0])
    );
  }

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
  };
  function handleTimeChange(event, time) {
    if (time !== undefined) {
      setSelectedTime(time);
    }
  }

  const handleDatePickerClose = () => {
    setDateShowPicker(false);
  };
  const handleTimePickerClose = () => {
    setTimeShowPicker(false);
  };
  function convertDate(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split("");
    var ddChars = dd.split("");

    return (
      yyyy +
      "-" +
      (mmChars[1] ? mm : "0" + mmChars[0]) +
      "-" +
      (ddChars[1] ? dd : "0" + ddChars[0])
    );
  }
  function compareDates(date1, date2) {
          date1Day = date1.getDate();
          date1Month = date1.getMonth();
          date1Year = date1.getFullYear();
          date2Day = date2.getDate();
          date2Month = date2.getMonth();
          date2Year = date2.getFullYear();
          if (date1Year > date2Year) {
                    return 1;
          } else if (date1Year < date2Year) {
                    return -1;
          } else {
                    if (date1Month > date2Month) {
                              return 1;
                    } else if (date1Month < date2Month) {
                              return -1;
                    } else {
                              if (date1Day > date2Day) {
                                        return 1;
                              } else if (date1Day < date2Day) {
                                        return -1;
                              } else {
                                        return 0;
                              }
                    }
          }
}
function compareTimes(time1, time2) {
          time1Hour = time1.getHours();
          time1Minute = time1.getMinutes();
          time2Hour = time2.getHours();
          time2Minute = time2.getMinutes();
          if (time1Hour > time2Hour) {
                    return 1;
          } else if (time1Hour < time2Hour) {
                    return -1;
          } else {
                    if (time1Minute > time2Minute) {
                              return 1;
                    } else if (time1Minute < time2Minute) {
                              return -1;
                    } else {
                              return 0;
                    }
          }
}

  function checkTime() {
    console.log("-------------------------------");
    console.log("selectedDate", selectedDate.getDate());
    console.log("selectedTime", selectedTime);
    console.log("converTime(selectedTime)", converTime(selectedTime));
    console.log("converTime(selectedDate)", convertDate(selectedDate));
    // compare with current date and time
    const currentDate = new Date();
    console.log("currentDate", currentDate.getDate());
    if(compareDates(selectedDate, currentDate) === 1){
              console.log("selectedDate is greater than currentDate");
          }else if(compareDates(selectedDate, currentDate) === -1){
                    console.log("selectedDate is less than currentDate");
          }else{
                    console.log("selectedDate is equal to currentDate");
          }
          if(compareTimes(selectedTime, currentDate) === 1){
                    console.log("selectedTime is greater than currentDate");
          }else if(compareTimes(selectedTime, currentDate) === -1){
                    console.log("selectedTime is less than currentDate");
          }else{
                    console.log("selectedTime is equal to currentDate");
          }
          // compare with current date and time
          console.log("-------------------------------");
  }

  return (
    <View style={styles.screen}>
      <View style={styles.formInputContainer}>
        <View style={styles.singleInputContainer}>
          <Text style={styles.formText}>Enter Date:</Text>
          <Pressable
            onPress={() => setDateShowPicker(true)}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.pressed : null,
            ]}
          >
            <View>
              <Text style={styles.buttonText}>{convertDate(selectedDate)}</Text>
            </View>
          </Pressable>
        </View>
        <CustomDateTimePicker
          visible={showDatePicker}
          date={selectedDate}
          onChange={handleDateChange}
          onClose={handleDatePickerClose}
          dateOrTime="date"
        />
        <View style={styles.singleInputContainer}>
          <Text style={styles.formText}>Enter Time:</Text>
          <Pressable
            onPress={() => setTimeShowPicker(true)}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.pressed : null,
            ]}
          >
            <View>
              <Text style={styles.buttonText}>{converTime(selectedTime)}</Text>
            </View>
          </Pressable>
          <CustomDateTimePicker
            visible={showTimePicker}
            date={selectedTime}
            onChange={handleTimeChange}
            onClose={handleTimePickerClose}
            dateOrTime="time"
          />
        </View>
        <Pressable
          onPress={checkTime}
          style={({ pressed }) => [
            styles.confirmButton,
            pressed ? styles.pressed : null,
          ]}
        >
          <View>
            <Text style={styles.confirmButtonText}>Check Time</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161829",
    height: "100%",
    width: "100%",
  },
  formInputContainer: {
    //     marginTop: 1,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#403535",
    width: "90%",
    height: "50%",
    borderColor: "#ffffff",
    borderWidth: 1,
    marginBottom: 10,
    margin: 5,
  },
  singleInputContainer: {
    borderRadius: 1,
    borderColor: "white",
    borderWidth: 1,
    width: "100%",
    //     height: 50,
    marginBottom: 10,
    padding: 10,
    //     color: "white",
  },

  button: {
    backgroundColor: "#403535",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  formText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  confirmButton: {
    backgroundColor: "#403535",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    //     backgroundColor:'white'
  },
});

export default MyDatePicker;
