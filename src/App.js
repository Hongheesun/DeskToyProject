/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import DiaryRoom from "./components/DiaryRoom";

// import sunWindow from "../public/img/sunwindow.png";
// import sunWindow from "./img/sunwindow.png";

firebase.initializeApp({
  apiKey: "AIzaSyDKGlrQWKVZm8OzSQBO8jQ3sAegfeooE8c",
  authDomain: "weathertogether-f0922.firebaseapp.com",
  projectId: "weathertogether-f0922",
  storageBucket: "weathertogether-f0922.appspot.com",
  messagingSenderId: "393268972611",
  appId: "1:393268972611:web:fdb5a919af69448cb718f6",
  measurementId: "G-E5X2NET7D3",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

let now = new Date();
let todayMonth = now.getMonth() + 1;
let todayDate = now.getDate();
let hours = now.getHours();
let time = function (hours, add) {
  if (hours + add >= 24) {
    return "0" + (hours + add - 24);
  } else {
    return hours + add;
  }
};
let minutes = now.getMinutes();

const weatherCases = {
  Rain: {
    colors: ["#00C6FB", "#005BEA"],
    title: "Raining",
    subtitle: "우산 챙기세요",
    icon: "☔",
    img: <img src="img/rainwindow.png" />,
  },
  Clear: {
    colors: ["#FEF253", "#FF7300"],
    title: "Sunny",
    subtitle: "구름 한 점 없는 맑은 날씨!",
    icon: "🌞",
    img: <img src="img/sunwindow.png" />,
  },
  Thunderstorm: {
    colors: ["#00ECBC", "#007ADF"],
    title: "Thunderstrom",
    subtitle: "천둥이쳐요!",
    icon: "⚡️",
    img: <img src="img/thunderwindow.png" />,
  },
  Clouds: {
    colors: ["#D7D2CC", "#304352"],
    title: "Clouds",
    subtitle: "구름이 꼈어요",
    icon: "☁️",
    img: <img src="img/cloudwindow.png" />,
  },
  Snow: {
    colors: ["#7DE2FC", "#B9B6E5"],
    title: "Snow",
    subtitle: "눈이와요!",
    icon: "☃️",
  },
  Drizzle: {
    colors: ["#89F7FE", "#66A6FF"],
    title: "Drizzle",
    subtitle: "이슬비가 내려요",
    icon: "🌧️",
    img: <img src="img/rainwindow.png" />,
  },
  Haze: {
    colors: ["#89F7FE", "#66A6FF"],
    title: "Haze",
    subtitle: "이슬비가 내려요",
    icon: "🌧️",
    img: <img src="img/rainwindow.png" />,
  },
  Mist: {
    colors: ["#89F7FE", "#66A6FF"],
    title: "Mist",
    subtitle: "이슬비가 내려요",
    icon: "🌧️",
    img: <img src="img/rainwindow.png" />,
  },
};

const proverbs = [
  "삶이 있는 한 희망은 있다  -키케로",
  "언제나 현재에 집중할수 있다면 행복할것이다. -파울로 코엘료",
  "피할수 없으면 즐겨라 – 로버트 엘리엇",
  "한번의 실패와 영원한 실패를 혼동하지 마라  -F.스콧 핏제랄드",
  "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다, -앙드레 말로",
  "행복은 습관이다,그것을 몸에 지니라 -허버드",
  "그대의 하루 하루를 그대의 마지막 날이라고 생각하라 – 호라티우스",
  "최고에 도달하려면 최저에서 시작하라. -P.시루스",
  "겨울이 오면 봄이 멀지 않으리 -셸리",
  "s",
];

const getRandomIndex = (length) => {
  return parseInt(Math.random() * length);
};

function App() {
  let [water, waterSet] = useState(true);

  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  // const [water, setWater] = useState("");
  const [error, setError] = useState(false);
  // const [tempMin, setTempMin] = useState("");
  // const [tempMax, setTempMax] = useState("");
  const API_KEY = "edc5c244d49a15ae2af9307cbbd804fe";
  const latitude = 38;
  const longitude = 128;
  // let city = 1835848;
  // const change = 273.15;
  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     waterSet(false);
  //   }, 2000);
  // });
  const getWeather = async () => {
    const resWeather = await axios.get(
      //현재 기온만
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      //최저 최고 기온까지 -> -change해줘야함
      //`http://api.openweathermap.org/data/2.5/weather?id=${city}&APPID=${API_KEY}`
      //기상 예측
      //`http://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${API_KEY}&units=metric`
      // 이따 날씨 예측
      //`https://api.openweathermap.org/data/2.5/forecast?latitude=${latitude}&longitude=${longitude}&appid=${API_KEY}`
    );
    let _main = resWeather.data.weather[0].main;
    let _temp = resWeather.data.main.temp;
    // let _temp_min = resWeather.data.main.temp_min;
    // let _temp_max = resWeather.data.main.temp_max;

    // let _main = resWeather.data.weather[0].list.main;
    // let _temp = resWeather.data.list.main.temp;
    // let _temp_min = resWeather.data.list.main.temp_min;
    // let _temp_max = resWeather.data.list.main.temp_max;

    setCurrentWeather(_main);
    setTemp(_temp);
    // setTempMin(_temp_min);
    // setTempMax(_temp_max);
  };

  useEffect(() => {
    getWeather(latitude, longitude);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          {/* <Menu></Menu> */}
          {/* <SignOut /> */}
          <button className="title">
            <Link to="/">Sunny's Desk</Link>
          </button>
        </header>
        <section>
          <Routes>
            {user ? (
              <Route
                exact
                path="/"
                element={
                  <Home
                    currentWeather={currentWeather}
                    lat={latitude}
                    temp={temp}
                  ></Home>
                }
              />
            ) : (
              // </Route>
              <Route exact path="/" element={<SignIn />} />
            )}
            {/* <section className="msg"> */}
            <Route exact path="/messages" element={<ChatRoom />} />
            {/* </section> */}
            <Route exact path="/diary" element={<DiaryRoom />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

// function getSeason(latitude, month) {
//   if (month >= 3 && month <= 5) {
//     return latitude > 0 ? "spring" : "winter";
//   } else if (month >= 6 && month <= 8) {
//     return latitude > 0 ? "summer" : "winter";
//   } else if (month >= 9 && month <= 10) {
//     return latitude > 0 ? "autumn" : "summer";
//   } else {
//     return latitude > 0 ? "winter" : "summer";
//   }
// }

function getSeason(month) {
  if (month >= 3 && month <= 5) {
    return "spring";
  } else if (month >= 6 && month <= 8) {
    return "summer";
  } else if (month >= 9 && month <= 10) {
    return "autumn";
  } else {
    return "winter";
  }
}

function getWater(hours) {
  if (hours >= 6 && hours <= 12) {
    return <img src="img/water01.png" />;
  } else if (hours >= 13 && hours <= 18) {
    return <img src="img/water02.png" />;
  } else if (hours >= 19 && hours <= 24) {
    return <img src="img/water03.png" />;
  } else if (hours >= 1 && hours <= 5) {
    return <img src="img/water04.png" />;
  }
}

function getClothes(month) {
  if (month >= 11 && month <= 3) {
    return <img src="img/padding.png" />;
  } else if (month >= 4 && month <= 5) {
    return <img src="img/cardigan.png" />;
  } else if (month >= 6 && month <= 8) {
    return <img src="img/halfshirt.png" />;
  } else if (month >= 9) {
    return <img src="img/longshirt.png" />;
  } else if (month >= 10) {
    return <img src="img/cardigan.png" />;
  }
}

function Home({ currentWeather, temp, latitude }) {
  // const water = changeWater(waters);
  //setSunny({ temp } > 20 ? true : false);
  const season = getSeason(todayMonth);
  const water = getWater(hours);
  const clothes = getClothes(todayMonth);
  const [isLightOn, setIsLightOn] = useState(false);
  return (
    <div className="home">
      {/* <div className="wall-stuff"> */}
      <button className="light" onClick={() => setIsLightOn(true)}>
        <img src="../img/light.png"></img>
      </button>
      <LightShawdow
        isLightOn={isLightOn}
        setIsLightOn={setIsLightOn}
      ></LightShawdow>
      {/* <div className="lightshawdow">
        <img src="../img/lightshawdow.png"></img>
      </div> */}
      {/* </div> */}
      {/* <p>{weatherCases[currentWeather].title}</p> */}

      <div className="window">{weatherCases[currentWeather].img}</div>
      <div className="clothes">
        <span className="hanger">
          <img src="img/hanger.png" />
        </span>
        <span className="cloth">{clothes}</span>
      </div>

      <div className="allDesk">
        {/* ////////// desk-stuff ////////// */}
        <div className="desk-stuff">
          <div className="date">
            <img src="../img/date.png"></img>
            <div className="today-date">
              {todayMonth}/{todayDate}
              <br></br>
              {hours}:{minutes}
            </div>
          </div>
          <div className="computer">
            <img src="../img/computer.png"></img>
            <div className="monitor">
              <p className="weather-info">
                오늘날씨<br></br>
                {weatherCases[currentWeather].subtitle}
                {season}
              </p>
              <p className="proverbs">
                {proverbs[getRandomIndex(proverbs.length)]}
              </p>
              <Link to="/messages">
                <div className="dm">
                  <div className="dm-head"></div>
                </div>
              </Link>
            </div>
          </div>

          <div className="water">{water}</div>
          <div className="memo">
            <Link to="/diary">
              <img src="../img/memo.png"></img>
            </Link>
          </div>
        </div>

        <div className="desk"></div>
        {/* ////////////////////////////////////////////////// */}
      </div>

      <div className="weatherInfo">
        {/* <span className="Celsius">{Math.round(temp)}°</span> */}
        {/* <span className="weather">{weatherCases[currentWeather].icon}</span> */}
        {/* <span className="date">
          {todayMonth}월 {todayDate}일 {hours}시 {minutes}분
  </span>*/}
        {/* <p>{weatherCases[currentWeather].subtitle}</p> */}
      </div>
      <div className="footer">
        {/* <span className="dailyMemo">
          <button>
            <Link to="/diary">MEMO</Link>
          </button>
        </span> */}

        {/* <button class="bottomBtn">
          <Link to="/messages">MESSAGE</Link>
        </button> */}
      </div>
    </div>
  );
}

function LightShawdow({ isLightOn, setIsLightOn }) {
  return (
    <div className="lightshawdow" hidden={!isLightOn}>
      <img src="../img/lightshawdow.png"></img>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        구글 로그인
      </button>
      <p>댓글을 쓰려면 로그인이 필요합니다!</p>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="msgWholeWrapper">
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="메시지를 입력해주세요"
        />

        <button type="submit" disabled={!formValue}>
          전송
        </button>
      </form>
    </section>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div>
      <div className={`message ${messageClass}`}>
        <img
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
        />
        <p className="messagesP">{text}</p>
      </div>
    </div>
  );
}

export default App;
