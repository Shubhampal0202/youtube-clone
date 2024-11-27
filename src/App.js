
import Header from "./Components/Header";
import Body from "./Components/Body";
import { Provider } from "react-redux";
import store from "./utils/store";
import { Routes, Route } from "react-router-dom";
import MainContainer from "./Components/MainContainer";
import WatchVideo from "./Components/WatchVideo";
import Search from "./Components/Search";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<MainContainer />} />
            <Route path="/:id/watch" element={<WatchVideo />} />
            <Route path="/results" element={<Search/>} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
