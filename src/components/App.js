import { Route, Routes } from "react-router-dom";
import CreateLink from "./CreateLink";
import Header from "./Header";
import LinkList from "./LinkList";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<LinkList />} />
        <Route path='/create' element={<CreateLink />} />
      </Routes>
    </>
  );
}

export default App;
