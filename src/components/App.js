import { Route, Routes } from "react-router-dom";
import CreateLink from "./CreateLink";
import Header from "./Header";
import LinkList from "./LinkList";
import Login from "./Login";
import Search from "./Search";

function App() {
  return (
    <>
      <Header />

      <div className='mt-20'>
        <Routes>
          <Route path='/' element={<LinkList />} />
          <Route path='/create' element={<CreateLink />} />
          <Route path='/login' element={<Login />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
