import { Route, Routes } from "react-router-dom";
import CreateLink from "./CreateLink";
import Header from "./Header";
import LinkList from "./LinkList";
import Login from "./Login";

function App() {
  return (
    <>
      <Header />

      <div className='mt-18'>
        <Routes>
          <Route path='/' element={<LinkList />} />
          <Route path='/create' element={<CreateLink />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
